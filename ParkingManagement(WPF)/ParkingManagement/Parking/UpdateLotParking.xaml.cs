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

namespace ParkingManagement.Parking
{
    /// <summary>
    /// Interaction logic for UpdateLotParking.xaml
    /// </summary>
    public partial class UpdateLotParking : Window
    {
        private ParkingLot parkingLotTmp;
        private List<ParkingLot> Parkinglots;

        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        public UpdateLotParking(Window owner,ParkingLot parkingLot)
        {
            Owner = owner;
            InitializeComponent();
            Parkinglots = new List<ParkingLot>();
            tblIdLotTitle.Text = parkingLot.Id;
            parkingLotTmp = parkingLot;
            tbNameParkingLot.Text = parkingLot.Name;
            tbNameParkingLot.IsEnabled = false;
            tbAddressParkingLot.Text = parkingLot.Address;
            tbAddressParkingLot.IsEnabled = false;
            tbImageParkingLot.Text = parkingLot.LocationCode;
            tbImageParkingLot.IsEnabled = false;
            tbImgUrlLot.Text = parkingLot.ImageUrlLot;
            tbImgUrlLot.IsEnabled = false;
            tbDescriptionLot.Text = parkingLot.Description;
            tbDescriptionLot.IsEnabled = false;
            cbActiveParkingLot.SelectedItem = parkingLot.IsActive;
            cbActiveParkingLot.IsEnabled = false;
            cbRoofParkingLot.IsEnabled = false;
            cbGuardParkingLot.IsEnabled = false;
            btnSave.Visibility = Visibility.Hidden;
            getData();
        }

        private async void getData()
        {
            IFirebaseClient client = new FirebaseClient(config);
            FirebaseResponse response = await client.GetAsync("ListParkingLot");
            var rusult = response.ResultAs<List<ParkingLot>>();
            foreach (ParkingLot item in rusult)
            {
                Parkinglots.Add(item);
            }
        }

        public static bool testTmp(string url)
        {
            return true;
        }
        public static bool IsImageURL(string url)
        {
            return Uri.TryCreate(url, UriKind.Absolute, out Uri uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps)
                && (uriResult.AbsolutePath.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
                    || uriResult.AbsolutePath.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
                    || uriResult.AbsolutePath.EndsWith(".png", StringComparison.OrdinalIgnoreCase));
        }
        private void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            tbNameParkingLot.IsEnabled = true;
            tbAddressParkingLot.IsEnabled = true;
            tbImageParkingLot.IsEnabled = true;
            cbActiveParkingLot.IsEnabled = true;
            cbRoofParkingLot.IsEnabled = true;
            cbGuardParkingLot.IsEnabled = true;
            tbImgUrlLot.IsEnabled = true;
            tbDescriptionLot.IsEnabled = true;
            btnSave.Visibility = Visibility.Visible;
        }

        private async void btnSave_Click(object sender, RoutedEventArgs e)
        {
            int index = Parkinglots.FindIndex(p => p.Id == parkingLotTmp.Id);
            var check = IsImageURL(tbImgUrlLot.Text);
            bool isRoof = false;
            bool isGuard = false;
            if (((ComboBoxItem)cbRoofParkingLot.SelectedItem).Content.ToString() == "True")
            {
                isRoof = true;
            }
            if (((ComboBoxItem)cbGuardParkingLot.SelectedItem).Content.ToString() == "True")
            {
                isGuard = true;
            }
            if (check)
            {
                Parkinglots[index].ImageUrlLot = tbImgUrlLot.Text;
                Parkinglots[index].Description = tbDescriptionLot.Text;
                Parkinglots[index].Name = tbNameParkingLot.Text;
                Parkinglots[index].Address = tbAddressParkingLot.Text;
                Parkinglots[index].LocationCode = tbImageParkingLot.Text;
                Parkinglots[index].LocationCode = tbImageParkingLot.Text;
                Parkinglots[index].IsRoof = isRoof;
                Parkinglots[index].IsGuard = isGuard;
                if (((ComboBoxItem)cbActiveParkingLot.SelectedItem).Content.ToString() == "True")
                {
                    Parkinglots[index].IsActive = true;
                }
                else
                {
                    Parkinglots[index].IsActive = false;
                }
                IFirebaseClient client = new FirebaseClient(config);
                SetResponse setResponse = await client.SetAsync("ListParkingLot", Parkinglots);
                MessageBox.Show("Update-Success!");
                this.Close();
            }
            else
            {
                MessageBox.Show("Img-url must be end with .*jpg or .*png");
            }
        }

        private void btnBack_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
