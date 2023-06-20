using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using System;
using System.Collections.Generic;
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

namespace ParkingManagement.Order
{
    /// <summary>
    /// Interaction logic for OrderViewDetail.xaml
    /// </summary>
    public partial class OrderViewDetail : Window
    {
        private string IdOrder;
        private List<OrderBooking> OrderList;
        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        public OrderViewDetail(string idOrder,Window owner,string idOwner)
        {
            InitializeComponent();
            IdOrder = idOrder;
            Owner = owner;
            IdOrder = idOrder;
            OrderList = new List<OrderBooking>();
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
            

            var index = OrderList.FindIndex(p => p.Id == IdOrder);
            tbIdOrder.Text = OrderList[index].Id;
            tbIdUser.Text = OrderList[index].IdUser;
            tblIdSlot.Text = OrderList[index].IdSlot;
            tblNameCustomer.Text = OrderList[index].NameCutomer;
            string dateTimeString = OrderList[index].TimeCome;
            DateTime dateTime = DateTime.ParseExact(dateTimeString, "yyyy-MM-ddTHH:mm", null);
            string formattedDateTime = dateTime.ToString("dd-MM-yyyy HH:mm");
            tbTimeCome.Text = formattedDateTime;
            string dateTimeString2 = OrderList[index].TimeOut;
            DateTime dateTime2 = DateTime.ParseExact(dateTimeString2, "yyyy-MM-ddTHH:mm", null);
            string formattedDateTime2 = dateTime2.ToString("dd-MM-yyyy HH:mm");
            tbTimeOut.Text = formattedDateTime2;
            tbPhone.Text = OrderList[index].Phone;
            tbDateCreate.Text = OrderList[index].DateTime;
            tbLicensePlates.Text = OrderList[index].LicensePlates;
            tbMessage.Text = OrderList[index].Message;
            tbCodeConfirm.Text = OrderList[index].codeConfirm;
            tbTotal.Text = OrderList[index].Total.ToString();
        }
        private void btnBack_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
        static string FormatDateTimeLocal(DateTime dateTime)
        {
            string formattedDateTimeLocal = dateTime.ToString("yyyy-MM-ddTHH:mm");
            return formattedDateTimeLocal;
        }
    }
}
