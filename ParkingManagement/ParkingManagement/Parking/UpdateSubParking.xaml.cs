using FireSharp.Interfaces;
using FireSharp.Response;
using FireSharp;
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
using FireSharp.Config;

namespace ParkingManagement.Parking
{
    /// <summary>
    /// Interaction logic for UpdateSubParking.xaml
    /// </summary>
    public partial class UpdateSubParking : Window
    {
        private ParkingSub ParkingSubtmp;
        private List<ParkingSub> parkingSubs;
        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        public UpdateSubParking(Window owner,ParkingSub parkingSub)
        {
            Owner = owner;
            InitializeComponent();
            parkingSubs = new List<ParkingSub>();
            tblIdSubName.Text = parkingSub.Id;
            ParkingSubtmp = parkingSub;
            btnSave.Visibility = Visibility.Hidden;
            tbAmountSlot.Text = parkingSub.Ammount;
            tbAmountSlot.IsEnabled = false;
            tblIdSubName.Text = parkingSub.Id;
            tbNameParkingSub.Text = parkingSub.Name;
            tbNameParkingSub.IsEnabled = false;
            tbImgParkingSub.Text = parkingSub.UrlImage;
            tbImgParkingSub.IsEnabled = false;
            cbIsActive.SelectedItem = parkingSub.IsActive;
            cbIsActive.IsEnabled = false;
            getData();
        }
        public async void getData()
        {
            IFirebaseClient client = new FirebaseClient(config);
            FirebaseResponse response = await client.GetAsync("ListParkingSub");
            var rusult = response.ResultAs<List<ParkingSub>>();
            foreach (ParkingSub item in rusult)
            {
                parkingSubs.Add(item);
            }
        }

        private void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            tbAmountSlot.IsEnabled = true;
            tbNameParkingSub.IsEnabled = true;
            tbImgParkingSub.IsEnabled = true;
            cbIsActive.IsEnabled = true;
            btnSave.Visibility = Visibility.Visible;
        }

        private async void btnSave_Click(object sender, RoutedEventArgs e)
        {
            var check1 = IsNumber(tbAmountSlot.Text);
            var check2 = IsImageURL(tbImgParkingSub.Text);
            if (check1)
            {
                if(check2)
                {
                    int index = parkingSubs.FindIndex(q => q.Id == ParkingSubtmp.Id);
                    parkingSubs[index].Name = tbNameParkingSub.Text;
                    parkingSubs[index].Ammount = tbAmountSlot.Text;
                    parkingSubs[index].UrlImage = tbImgParkingSub.Text;

                    if (((ComboBoxItem)cbIsActive.SelectedItem).Content.ToString() == "False")
                    {
 
                        parkingSubs[index].IsActive = false;
                    }
                    else
                    {

                        parkingSubs[index].IsActive = true;
                    }

                    IFirebaseClient client = new FirebaseClient(config);
                    SetResponse setResponse = await client.SetAsync("ListParkingSub", parkingSubs);
                    MessageBox.Show("Update-Success!");
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Img-Url must be end with .*jpg or .* png...");
                }
            }
            else
            {
                MessageBox.Show("Amount-input must be integer!");
            }
        }
        public static bool IsImageURL(string url)
        {
            return Uri.TryCreate(url, UriKind.Absolute, out Uri uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps)
                && (uriResult.AbsolutePath.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
                    || uriResult.AbsolutePath.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
                    || uriResult.AbsolutePath.EndsWith(".png", StringComparison.OrdinalIgnoreCase));
        }
        public bool IsNumber(string input)
        {
            int number;
            return int.TryParse(input, out number);
        }
        private void btnBack_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
