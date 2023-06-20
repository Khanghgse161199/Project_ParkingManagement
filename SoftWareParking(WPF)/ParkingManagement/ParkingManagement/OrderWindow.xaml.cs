using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using FireSharp;
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
using static ParkingManagement.Order.OrderBooking;
using ParkingManagement.Order;

namespace ParkingManagement
{
    /// <summary>
    /// Interaction logic for OrderWindow.xaml
    /// </summary>
    public partial class OrderWindow : Window
    {
        private bool IsSort;
        private List<OrderBooking> OrderList;
        private string IdOwner;
        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        public OrderWindow(string idOwner)
        {
            InitializeComponent();        
            OrderList = new List<OrderBooking>();
            IdOwner = idOwner;
            getData();
        }
        public async void getData()
        {
            IFirebaseClient client = new FirebaseClient(config);
            FirebaseResponse response = await client.GetAsync("listOrderBooking");
            var Orders = response.ResultAs<List<OrderBooking>>();
            foreach (OrderBooking item in Orders)
            {
                OrderList.Add(item);
            }
            lvOrders.ItemsSource = OrderList;
            CollectionView view = (CollectionView)CollectionViewSource.GetDefaultView(lvOrders.ItemsSource);
            view.GroupDescriptions.Add(new PropertyGroupDescription("status"));
            view.Filter = UserFilter;
        }
        private void txtFilter_TextChanged(object sender, TextChangedEventArgs e)
        {
            CollectionViewSource.GetDefaultView(lvOrders.ItemsSource).Refresh();
        }
        private bool UserFilter(object item)
        {
            if (string.IsNullOrEmpty(txtFilter.Text))
            {
                return true;
            }
            else
            {
                return ((item as OrderBooking).Id.IndexOf(txtFilter.Text, StringComparison.OrdinalIgnoreCase) >= 0);
            }
        }

        private void GridViewColumnHeader_Click(object sender, RoutedEventArgs e)
        {
            GridViewColumnHeader header = sender as GridViewColumnHeader;
            CollectionView view = (CollectionView)CollectionViewSource.GetDefaultView(lvOrders.ItemsSource);
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
            MainWindow mainWindow = new MainWindow(true,IdOwner);
            mainWindow.Show();
            this.Close();
        }    

        private void btnProfile_Click(object sender, RoutedEventArgs e)
        {
            ProfileWindow profileWindow = new ProfileWindow(IdOwner);
            this.Close();
            profileWindow.Show();
        }

        private async void btnConfirm_Click(object sender, RoutedEventArgs e)
        {
            OrderBooking orderBooking = (OrderBooking)lvOrders.SelectedItem;
            if (orderBooking != null)
            {
                int index = OrderList.FindIndex(p => p.Id == orderBooking.Id);
                OrderList[index].status = 0;
                OrderList[index].codeConfirm = generateCode(16);
                IFirebaseClient client = new FirebaseClient(config);
                SetResponse setResponse = await client.SetAsync("listOrderBooking", OrderList);
                MessageBox.Show("Confirm Success!");
                OrderWindow orderWindow = new OrderWindow(IdOwner);
                this.Close();
                orderWindow.Show();
                
            }
            else
            {
                MessageBox.Show("Choose oreder first!");
            }
        }

        private void btnView_Click(object sender, RoutedEventArgs e)
        {
            OrderBooking orderBooking = (OrderBooking)lvOrders.SelectedItem;
            if (orderBooking != null)
            {
                OrderViewDetail orderViewDetail = new OrderViewDetail(orderBooking.Id,this,IdOwner);
                orderViewDetail.ShowDialog();
            }
            else
            {
                MessageBox.Show("Choose oreder first!");
            }
        }

            private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            OrderBooking orderBooking = (OrderBooking)lvOrders.SelectedItem;
            if (orderBooking != null)
            {
                IFirebaseClient client = new FirebaseClient(config);
                FirebaseResponse responsess = await client.GetAsync("ListAccountOwners");
                var Owners = responsess.ResultAs<List<AcountOwner>>();
                string userNameOwner = Owners.Where(p => p.owner.idOwner == IdOwner).FirstOrDefault().account.userName;
                ModalConfirm modalConfirm = new ModalConfirm(userNameOwner);
                modalConfirm.ShowDialog();
                bool isCheckConfirm = modalConfirm.check;
                if (isCheckConfirm)
                {
                    int index = OrderList.FindIndex(p => p.Id == orderBooking.Id);
                    if (OrderList[index].IsActive == false)
                    {
                        OrderList.RemoveAt(index);
                        SetResponse setResponse = await client.SetAsync("listOrderBooking", OrderList);
                        MessageBox.Show("Delete Success!");
                        OrderWindow orderWindow = new OrderWindow(IdOwner);
                        this.Close();
                        orderWindow.Show();
                    }
                    else
                    {
                        MessageBox.Show("sorry this order Is-Active");
                    }
                }                
            }
            else
            {
                MessageBox.Show("Choose oreder first!");
            }
        }

        private async void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            OrderBooking orderBooking = (OrderBooking)lvOrders.SelectedItem;
            if (orderBooking != null)
            {
                if(orderBooking.IsActive == true)
                {
                    var result = MessageBox.Show("Update this order-Active to False ?", "Note", MessageBoxButton.YesNo, MessageBoxImage.Hand);
                    if (result == MessageBoxResult.Yes)
                    {
                        IFirebaseClient client = new FirebaseClient(config);
                        FirebaseResponse responsess = await client.GetAsync("ListAccountOwners");
                        var Owners = responsess.ResultAs<List<AcountOwner>>();
                        string userNameOwner = Owners.Where(p => p.owner.idOwner == IdOwner).FirstOrDefault().account.userName;
                        ModalConfirm modalConfirm = new ModalConfirm(userNameOwner);
                        modalConfirm.ShowDialog();
                        bool isCheckConfirm = modalConfirm.check;
                        if (isCheckConfirm)
                        {
                            int index = OrderList.FindIndex(p => p.Id == orderBooking.Id);
                            OrderList[index].IsActive = false;
                            SetResponse setResponse = await client.SetAsync("listOrderBooking", OrderList);
                            MessageBox.Show("Update Active -> false Success!");
                            OrderWindow orderWindow = new OrderWindow(IdOwner);
                            this.Close();
                            orderWindow.Show();
                        }
                    }
                }
                else
                {
                    var result = MessageBox.Show("Update this order to true ?", "Note", MessageBoxButton.YesNo, MessageBoxImage.Hand);
                    if (result == MessageBoxResult.Yes)
                    {
                        IFirebaseClient client = new FirebaseClient(config);
                        FirebaseResponse responsess = await client.GetAsync("ListAccountOwners");
                        var Owners = responsess.ResultAs<List<AcountOwner>>();
                        string userNameOwner = Owners.Where(p => p.owner.idOwner == IdOwner).FirstOrDefault().account.userName;
                        ModalConfirm modalConfirm = new ModalConfirm(userNameOwner);
                        modalConfirm.ShowDialog();
                        bool isCheckConfirm = modalConfirm.check;
                        if (isCheckConfirm)
                        {
                            int index = OrderList.FindIndex(p => p.Id == orderBooking.Id);
                            OrderList[index].IsActive = true;
                            SetResponse setResponse = await client.SetAsync("listOrderBooking", OrderList);
                            MessageBox.Show("Update Active -> true Success!");
                            OrderWindow orderWindow = new OrderWindow(IdOwner);
                            this.Close();
                            orderWindow.Show();
                        }
                    }
                }
            }
            else
            {
                MessageBox.Show("Choose oreder first!");
            }
        }

        static string generateCode(int length)
        {
            const string chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            var result = new string(
                Enumerable.Repeat(chars, length)
                          .Select(s => s[random.Next(s.Length)])
                          .ToArray());
            return result;
        }

        private void btnParkingWindow_Click(object sender, RoutedEventArgs e)
        {
            ParkingLotWindow parkingLotWindow = new ParkingLotWindow(IdOwner);
            this.Close();
            parkingLotWindow.Show();
        }
    }
}
