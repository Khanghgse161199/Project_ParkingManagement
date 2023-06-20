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
    /// Interaction logic for ParkingSlotWindow.xaml
    /// </summary>
    public partial class ParkingSlotWindow : Window
    {
        public bool IsSort;
        private string IdParkingLot;
        private string IdParkingSub;
        private string MaxAmountSlot;
        private List<ParkingSlot> ParkingSlots;

        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        public ParkingSlotWindow(Window owner,string idParkingLot,string idParkingSub,string Amount)
        {
            Owner = owner;           
            InitializeComponent();
            tblIdParkingSub.Text = idParkingSub;
            IdParkingLot = idParkingLot;
            IdParkingSub = idParkingSub;
            MaxAmountSlot = Amount;
            ParkingSlots = new List<ParkingSlot>();
            getData();
        }
        public async Task getData()
        {
            IFirebaseClient client = new FirebaseClient(config);
            FirebaseResponse response = await client.GetAsync("ListParkingSlot");
            var parkingSlots = response.ResultAs<List<ParkingSlot>>();
            foreach (ParkingSlot item in parkingSlots)
            {
                if (item.IdParkingSub == IdParkingSub)
                {
                    ParkingSlots.Add(item);
                }
            }
            lvParkingSlot.ItemsSource = ParkingSlots;

            CollectionView view = (CollectionView)CollectionViewSource.GetDefaultView(lvParkingSlot.ItemsSource);
            view.GroupDescriptions.Add(new PropertyGroupDescription("status"));
            view.Filter = UserFilter;
        }
        private void txtFilter_TextChanged(object sender, TextChangedEventArgs e)
        {
            CollectionViewSource.GetDefaultView(lvParkingSlot.ItemsSource).Refresh();
        }
        private bool UserFilter(object item)
        {
            if (string.IsNullOrEmpty(txtFilter.Text))
            {
                return true;
            }
            else
            {
                return ((item as ParkingSlot).Name.IndexOf(txtFilter.Text, StringComparison.OrdinalIgnoreCase) >= 0);
            }
        }

        private void GridViewColumnHeader_Click(object sender, RoutedEventArgs e)
        {
            GridViewColumnHeader header = sender as GridViewColumnHeader;
            CollectionView view = (CollectionView)CollectionViewSource.GetDefaultView(lvParkingSlot.ItemsSource);
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
        

       

        private void btnAddParkingSlot_Click(object sender, RoutedEventArgs e)
        {
            if(ParkingSlots.Count() <= int.Parse(MaxAmountSlot))
            {
                AddSlotParking addSlotParking = new AddSlotParking(this, IdParkingLot, IdParkingSub, int.Parse(MaxAmountSlot), ParkingSlots.Count());
                addSlotParking.ShowDialog();
                ParkingSlotWindow parkingSlotWindow = new ParkingSlotWindow(Owner, IdParkingLot, IdParkingSub, MaxAmountSlot);
                this.Close();
                parkingSlotWindow.Show();
            }
            else
            {
                MessageBox.Show("Sorry lit-mit Amount in this Sub-P is: " + MaxAmountSlot);
            }
           
        }

        private void btnBack_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            ParkingSlot slot = lvParkingSlot.SelectedItem as ParkingSlot;
            if(slot != null)
            {
                if (slot.status == Status.Empty)
                {
                    if(slot.IsActive == false)
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
                        if(isCheckConfirm) {
                            modalConfirm.Close();
                            FirebaseResponse response = await client.GetAsync("ListParkingSlot");
                            var parkingSlots = response.ResultAs<List<ParkingSlot>>();
                            int index = parkingSlots.FindIndex(p => p.Id == slot.Id);
                            var result = MessageBox.Show("Do you want delete slot - " + slot.Id + "!", "Note", MessageBoxButton.YesNo, MessageBoxImage.Warning);
                            if (result == MessageBoxResult.Yes)
                            {
                                parkingSlots.RemoveAt(index);
                                SetResponse setResponse = await client.SetAsync("ListParkingSlot", parkingSlots);
                                ParkingSlotWindow newParkingSlotWindow = new ParkingSlotWindow(Owner, IdParkingLot, IdParkingSub, MaxAmountSlot);
                                this.Close();
                                newParkingSlotWindow.Show();
                            }
                        }
                    }
                    else
                    {
                        MessageBox.Show("Sorry - this slot is-active!");
                    }
                }
                else
                {
                    MessageBox.Show("Sorry - this slot was booked!");
                }
            }
            else
            {
                MessageBox.Show("Choose slot frist!");
            }
        }

        private async void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            ParkingSlot slot = lvParkingSlot.SelectedItem as ParkingSlot;
            if (slot != null)
            {
               if(slot.status == Status.Empty)
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
                            UpdateSlotParking updateSlotParking = new UpdateSlotParking(this.Owner, slot);
                            updateSlotParking.ShowDialog();
                            ParkingSlotWindow newParkingSlotWindow = new ParkingSlotWindow(Owner, IdParkingLot, IdParkingSub, MaxAmountSlot);
                            newParkingSlotWindow.Show();
                            this.Close();
                        }           
                }
                else
                {
                    MessageBox.Show("this slot is booking!");
                }
            }
            else
            {
                MessageBox.Show("Choose slot frist!");
            }
        }
    }
}
