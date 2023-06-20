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
using System.Threading;
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
    /// Interaction logic for ParkingLotWindow.xaml
    /// </summary>
    public partial class ParkingLotWindow : Window
    {
        private bool IsSort;
        private string idAccountOwner;
        private List<ParkingLot> parkingLotsTmp;

        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        public ParkingLotWindow(string idAccountOwner)
        {
            InitializeComponent();
            this.idAccountOwner = idAccountOwner;
            parkingLotsTmp = new List<ParkingLot>();
            getData();
        }
        public async void getData()
        {
            IFirebaseClient client = new FirebaseClient(config);
            FirebaseResponse response = await client.GetAsync("ListParkingLot");
            var parkingLots = response.ResultAs<List<ParkingLot>>();
            foreach (ParkingLot item in parkingLots)
            {
                parkingLotsTmp.Add(item);
            }
            lvParkingLot.ItemsSource = parkingLotsTmp;
            CollectionView view = (CollectionView)CollectionViewSource.GetDefaultView(lvParkingLot.ItemsSource);
            view.Filter = UserFilter;
        }
        private void txtFilter_TextChanged(object sender, TextChangedEventArgs e)
        {
            CollectionViewSource.GetDefaultView(lvParkingLot.ItemsSource).Refresh();
        }
        private bool UserFilter(object item)
        {
            if (string.IsNullOrEmpty(txtFilter.Text))
            {
                return true;
            }
            else
            {
                return ((item as ParkingLot).Name.IndexOf(txtFilter.Text, StringComparison.OrdinalIgnoreCase) >= 0);
            }
        }

        private void GridViewColumnHeader_Click(object sender, RoutedEventArgs e)
        {
            GridViewColumnHeader header = sender as GridViewColumnHeader;
            CollectionView view = (CollectionView)CollectionViewSource.GetDefaultView(lvParkingLot.ItemsSource);
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
        private void btnHomeWindow_Click(object sender, RoutedEventArgs e)
        {
            MainWindow mainWindow = new MainWindow(true,idAccountOwner);
            mainWindow.Show();
            this.Close();
        }

        private void btnAddParkingLot_Click(object sender, RoutedEventArgs e)
        {
            AddParkingLot addParkingLot = new AddParkingLot(this,idAccountOwner);
            addParkingLot.ShowDialog();
            ParkingLotWindow parkingLotWindow = new ParkingLotWindow(idAccountOwner);
            this.Close();
            parkingLotWindow.Show();
        }

        private void btnSubParking_Click(object sender, RoutedEventArgs e)
        {
            var result = (ParkingLot)lvParkingLot.SelectedItem;
            if(result != null)
            {
               if(result.IsActive == true)
                {
                    ParkingSubWindow parkingSubWindow = new ParkingSubWindow(this, result.Id);
                    parkingSubWindow.ShowDialog();
                }
                else
                {
                    MessageBox.Show("Sorry this Parking-Lot un-active!!!");
                }
            }
            else
            {
                MessageBox.Show("Choose Parking-Lot frist!!!");
            }
                    
        }

        private void btnProfile_Click(object sender, RoutedEventArgs e)
        {
            ProfileWindow profileWindow = new ProfileWindow(idAccountOwner);
            profileWindow.Show();
            this.Close();
        }

        private async void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            ParkingLot parkingLot = (ParkingLot)lvParkingLot.SelectedItem;
            if(parkingLot != null)
            {
                bool isCheckConfirm = false;
                IFirebaseClient client = new FirebaseClient(config);
                string idOwner = parkingLotsTmp.Where(q => q.Id == parkingLot.Id).FirstOrDefault().IdOwner;
                FirebaseResponse responsess = await client.GetAsync("ListAccountOwners");
                var Owners = responsess.ResultAs<List<AcountOwner>>();
                string userNameOwner = Owners.Where(p => p.owner.idOwner == idOwner).FirstOrDefault().account.userName;
                ModalConfirm modalConfirm = new ModalConfirm(userNameOwner);
                modalConfirm.ShowDialog();
                isCheckConfirm = modalConfirm.check;
                if (isCheckConfirm)
                {
                    UpdateLotParking updateLotParking = new UpdateLotParking(this, parkingLot);
                    updateLotParking.ShowDialog();
                    ParkingLotWindow parkingLotWindow = new ParkingLotWindow(idAccountOwner);
                    parkingLotWindow.Show();
                    this.Close();
                }
            }
            else
            {
                MessageBox.Show("Choose Parking-Lot frist!");
            }
        }

        private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            ParkingLot parkingLot = (ParkingLot)lvParkingLot.SelectedItem;           
            if(parkingLot != null)
            {
                if(parkingLot.IsActive == false) {
                    IFirebaseClient client = new FirebaseClient(config);
                    FirebaseResponse response = await client.GetAsync("ListParkingSlot");
                    var parkingSlots = response.ResultAs<List<ParkingSlot>>();
                    List<ParkingSlot> slotListTmp = new List<ParkingSlot>();
                    List<ParkingSub> subListTmp = new List<ParkingSub>();
                    if (parkingSlots.Count > 0)
                    {
                        var check = false;
                        foreach (var item in parkingSlots)
                        {
                            if (item.IdParkingLot == parkingLot.Id)
                            {
                                if (item.status == Status.Booked)
                                {
                                    check = true;
                                    MessageBox.Show("Sorry - have a slot booked in this Lot");
                                    break;
                                }
                                else
                                {
                                    if (item.IsActive == true)
                                    {
                                        check = true;
                                        MessageBox.Show("Sorry - have a Parking-Slot IsActive in this Lot");
                                        break;
                                    }
                                    else
                                    {
                                        continue;
                                    }
                                }
                            }
                            else
                            {
                                slotListTmp.Add(item);
                            }
                        }
                        if (!check)
                        {
                            FirebaseResponse responses = await client.GetAsync("ListParkingSub");
                            var parkingSubs = responses.ResultAs<List<ParkingSub>>();
                            if (parkingSubs.Count > 0)
                            {
                                var check2 = false;
                                foreach (ParkingSub item in parkingSubs)
                                {
                                    if (item.IdParkingLot == parkingLot.Id)
                                    {
                                        if (item.IsActive == true)
                                        {
                                            check2 = true;
                                            MessageBox.Show("Sorry - have have Parking-Sub IsActive in this Lot");
                                            break;
                                        }
                                        else
                                        {
                                            continue;
                                        }
                                    }
                                    else
                                    {
                                        subListTmp.Add(item);
                                    }
                                }
                                if (!check2)
                                {
                                    bool isCheckConfirm = false;
                                    string idOwner = parkingLotsTmp.Where(q => q.Id == parkingLot.Id).FirstOrDefault().IdOwner;
                                    FirebaseResponse responsess = await client.GetAsync("ListAccountOwners");
                                    var Owners = responsess.ResultAs<List<AcountOwner>>();
                                    string userNameOwner = Owners.Where(p => p.owner.idOwner == idOwner).FirstOrDefault().account.userName;
                                    ModalConfirm modalConfirm = new ModalConfirm(userNameOwner);
                                    modalConfirm.ShowDialog();
                                    isCheckConfirm = modalConfirm.check;
                                    if (isCheckConfirm)
                                    {
                                        var result = MessageBox.Show("Do you want delete this lot-parking - " + parkingLot.Id + "! \n (Sub-Parking and Slot-Parking in this Lot-Parking will be delete too...)", "Note", MessageBoxButton.YesNo, MessageBoxImage.Warning);
                                        if (result == MessageBoxResult.Yes)
                                        {
                                            parkingLotsTmp.RemoveAt(parkingLotsTmp.FindIndex(q => q.Id == parkingLot.Id));
                                            SetResponse setResponse = await client.SetAsync("ListParkingLot", parkingLotsTmp);
                                            SetResponse setResponses = await client.SetAsync("ListParkingSub", subListTmp);
                                            SetResponse setResponsess = await client.SetAsync("ListParkingSlot", slotListTmp);
                                            MessageBox.Show("Update-Success!");
                                            ParkingLotWindow parkingLotWindow = new ParkingLotWindow(idAccountOwner);
                                            parkingLotWindow.Show();
                                            this.Close();
                                        }
                                        else
                                        {
                                            MessageBox.Show("Choose Parking-Lot frist!");
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else
                {
                    MessageBox.Show("Sorry thhis Lot-Parking is-active!");
                }        
            }
            else
            {
                MessageBox.Show("Choose Lot-Parking frist!");
            }           
        }

        private void btnOrderCliked_Click(object sender, RoutedEventArgs e)
        {
            OrderWindow orderWindow = new OrderWindow(idAccountOwner);
            this.Close();
            orderWindow.Show();
        }
    }
}
