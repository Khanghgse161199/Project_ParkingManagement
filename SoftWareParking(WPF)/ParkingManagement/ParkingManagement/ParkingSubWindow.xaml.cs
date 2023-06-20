using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using ParkingManagement.Object;
using ParkingManagement.Parking;
using ParkingManagement.View;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using static ParkingManagement.Parking.ParkingSlot;

namespace ParkingManagement
{
    /// <summary>
    /// Interaction logic for ParkingSubWindow.xaml
    /// </summary>
    public partial class ParkingSubWindow : Window
    {
        public bool IsSort;
        public string IdParkingLot;
        public List<ParkingSub> parkingSubsTmp;
        private List<ParkingSub> parkingSubs;

        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        public ParkingSubWindow(Window owner, string idParkingLot)
        {         
            Owner = owner;
            InitializeComponent();
            tblIdParkingLot.Text = idParkingLot;
            IdParkingLot = idParkingLot;
            parkingSubsTmp = new List<ParkingSub>();
            parkingSubs = new List<ParkingSub>(); 
            getData();
        }

        public async void getData()
        {
            IFirebaseClient client = new FirebaseClient(config);
            FirebaseResponse response = await client.GetAsync("ListParkingSub");
            parkingSubs = response.ResultAs<List<ParkingSub>>();
            if (parkingSubs.Count > 0)
            {
                foreach (ParkingSub item in parkingSubs)
                {
                    if (item.IdParkingLot == IdParkingLot)
                    {
                        parkingSubsTmp.Add(item);
                    }
                }
            }
            lvParkingSubs.ItemsSource = parkingSubsTmp;
            CollectionView view = (CollectionView)CollectionViewSource.GetDefaultView(lvParkingSubs.ItemsSource);
            view.Filter = UserFilter;
        }
        private void txtFilter_TextChanged(object sender, TextChangedEventArgs e)
        {
            CollectionViewSource.GetDefaultView(lvParkingSubs.ItemsSource).Refresh();
        }
        private bool UserFilter(object item)
        {
            if (string.IsNullOrEmpty(txtFilter.Text))
            {
                return true;
            }
            else
            {
                return ((item as ParkingSub).Name.IndexOf(txtFilter.Text, StringComparison.OrdinalIgnoreCase) >= 0);
            }
        }

        private void GridViewColumnHeader_Click(object sender, RoutedEventArgs e)
        {
            GridViewColumnHeader header = sender as GridViewColumnHeader;
            CollectionView view = (CollectionView)CollectionViewSource.GetDefaultView(lvParkingSubs.ItemsSource);
            if (IsSort)
            {
                view.SortDescriptions.Clear();
                view.SortDescriptions.Add(new SortDescription(header.Content.ToString(), ListSortDirection.Ascending));
            }
            else
            {
                view.SortDescriptions.Clear();
                view.SortDescriptions.Add(new SortDescription(header.Content.ToString(), ListSortDirection.Descending));
            }
            IsSort = !IsSort;
        }
       
       
        private void btnAddParkingSub_Click(object sender, RoutedEventArgs e)
        {
            AddSubParking addSubParking = new AddSubParking(this,IdParkingLot);
            addSubParking.ShowDialog();
            ParkingSubWindow parkingSubWindow = new ParkingSubWindow(Owner, IdParkingLot);
            this.Close();
            parkingSubWindow.Show();
        }

        private void btnParkingSlot_Click(object sender, RoutedEventArgs e)
        {
            ParkingSub tmp = (ParkingSub)lvParkingSubs.SelectedItem;
            
            if (tmp != null)
            {
                if(tmp.IsActive == true)
                {
                    ParkingSlotWindow parkingSlotWindow = new ParkingSlotWindow(this, IdParkingLot, tmp.Id, tmp.Ammount);
                    parkingSlotWindow.ShowDialog();
                }
                else
                {
                    MessageBox.Show("Sorry this Parking-Sub un-active!!!");
                }
            }
            else
            {
                MessageBox.Show("Choose Parking-Sub frist!!!");
            }
        }

        private void btnBack_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            ParkingSub parkingSub = (ParkingSub)lvParkingSubs.SelectedItem;
            if (parkingSub != null)
            {
                if (parkingSub.IsActive == false)
                {
                    bool checkSlotActive = false;
                    List<ParkingSlot> parkingSlots;
                    IFirebaseClient client = new FirebaseClient(config);
                    FirebaseResponse response = await client.GetAsync("ListParkingSlot");
                    parkingSlots = response.ResultAs<List<ParkingSlot>>();
                    List<ParkingSlot> tmpSlot = new List<ParkingSlot>();
                    
                    foreach (ParkingSlot item in parkingSlots)
                    {
                        string[] tmp = item.Id.Split("-");
                        if ((tmp[0] + "-" + tmp[1]) == parkingSub.Id)
                        {
                            if(item.IsActive == false)
                            {
                               if(item.status == Status.Empty)
                                {
                                    continue;
                                }
                                else
                                {
                                    checkSlotActive = true;
                                    break;
                                }
                            }
                            else
                            {
                                checkSlotActive = true;
                                break;
                            }

                        }
                        else
                        {
                            tmpSlot.Add(item);
                        }
                    }
                    if (!checkSlotActive)
                    {
                        bool isCheckConfirm = false;
                        FirebaseResponse responses = await client.GetAsync("ListParkingLot");
                        var parkingLots = responses.ResultAs<List<ParkingLot>>();
                        string idOwner = parkingLots.Where(q => q.Id == IdParkingLot).FirstOrDefault().IdOwner;
                        FirebaseResponse responsess = await client.GetAsync("ListAccountOwners");
                        var Owners = responsess.ResultAs<List<AcountOwner>>();
                        string userNameOwner = Owners.Where(p => p.owner.idOwner == idOwner).FirstOrDefault().account.userName;
                        ModalConfirm modalConfirm = new ModalConfirm(userNameOwner);
                        modalConfirm.ShowDialog();
                        isCheckConfirm = modalConfirm.check;
                        if (isCheckConfirm)
                        {
                            modalConfirm.Close();
                            var result = MessageBox.Show("Do you want delete this sub-parking - " + parkingSub.Id + "!\n (Sub-Parking and Slot-Parking in this Lot-Parking will be delete too...)", "Note", MessageBoxButton.YesNo, MessageBoxImage.Warning);
                            if (result == MessageBoxResult.Yes)
                            {
                                parkingSubs.RemoveAt(parkingSubs.FindIndex(q => q.Id == parkingSub.Id));
                                SetResponse setResponse = await client.SetAsync("ListParkingSub", parkingSubs);
                                ParkingSubWindow parkingSubWindow = new ParkingSubWindow(Owner, IdParkingLot);
                                SetResponse setResponses = await client.SetAsync("ListParkingSlot", tmpSlot);
                                this.Close();
                                parkingSubWindow.Show();
                            }
                        }
                    }
                    else
                    {
                        MessageBox.Show("Sorry slot in this sub is acitve or was booked");
                    }                   
                }
                else
                {
                    MessageBox.Show("this sub-parkign is un-active!");
                }
            }
            else
            {
                MessageBox.Show("Choose Parking-Sub frist!!!");
            }
        }

        private async void Update_Click(object sender, RoutedEventArgs e)
        {
            ParkingSub parkingSub = (ParkingSub)lvParkingSubs.SelectedItem;
            if (parkingSub != null)
            {
                bool isCheckConfirm = false;
                IFirebaseClient client = new FirebaseClient(config);
                FirebaseResponse responses = await client.GetAsync("ListParkingLot");
                var parkingLots = responses.ResultAs<List<ParkingLot>>();
                string idOwner = parkingLots.Where(q => q.Id == IdParkingLot).FirstOrDefault().IdOwner;
                FirebaseResponse responsess = await client.GetAsync("ListAccountOwners");
                var Owners = responsess.ResultAs<List<AcountOwner>>();
                string userNameOwner = Owners.Where(p => p.owner.idOwner == idOwner).FirstOrDefault().account.userName;
                ModalConfirm modalConfirm = new ModalConfirm(userNameOwner);
                modalConfirm.ShowDialog();
                isCheckConfirm = modalConfirm.check;
                if (isCheckConfirm)
                {
                    UpdateSubParking updateSubParking = new UpdateSubParking(Owner, parkingSub);
                    updateSubParking.ShowDialog();
                    ParkingSubWindow parkingSubWindow = new ParkingSubWindow(Owner, IdParkingLot);
                    this.Close();
                    parkingSubWindow.Show();
                }
            }
            else
            {
                MessageBox.Show("Choose Parking-Sub frist!!!");
            }
        }

    }
}
