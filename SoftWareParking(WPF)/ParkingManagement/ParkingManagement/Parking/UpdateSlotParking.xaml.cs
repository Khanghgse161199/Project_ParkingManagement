using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using ParkingManagement.Object;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
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

namespace ParkingManagement.Parking
{
    /// <summary>
    /// Interaction logic for UpdateSlotParking.xaml
    /// </summary>
    public partial class UpdateSlotParking : Window
    {
        
        private ParkingSlot Slot;
        private List<ParkingSlot> ParkingSlots;

        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        public UpdateSlotParking(Window owner,ParkingSlot parkingSlot)
        {
            Owner = owner;
            InitializeComponent();
            ParkingSlots = new List<ParkingSlot>();
            Slot = parkingSlot;
            tblIdSlotName.Text = Slot.Id;
            tbNameSlot.Text = Slot.Name;
            tbNameSlot.IsEnabled = false;
            tbAcreage.Text = Slot.Acreage;
            tbAcreage.IsEnabled = false;
            tbImgSlotUrl.Text = Slot.ImgUrl;
            tbImgSlotUrl.IsEnabled = false;     
            cbStatus.SelectedItem = Slot.status;
            cbStatus.IsEnabled = false;
            cbIsActive.SelectedItem = Slot.IsActive;
            cbIsActive.IsEnabled = false;            
            tbPriceDaytim.Text = Slot.PriceDaytime.ToString();
            tbPriceDaytim.IsEnabled = false;
            tbtbPriceOverNight.Text = Slot.PriceOverNight.ToString();
            tbtbPriceOverNight.IsEnabled = false;
            btnSave.Visibility = Visibility.Hidden;
            getData();
        }
        public async void getData()
        {
            IFirebaseClient client = new FirebaseClient(config);
            FirebaseResponse response = await client.GetAsync("ListParkingSlot");
            var rusult = response.ResultAs<List<ParkingSlot>>();
            foreach (ParkingSlot item in rusult)
            {
                ParkingSlots.Add(item);
            }
        }

        private void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            btnUpdate.Content = string.Empty;
            btnUpdate.Content = "Save";
            tbNameSlot.IsEnabled = true;
            tbAcreage.IsEnabled = true;
            tbImgSlotUrl.IsEnabled = true;
            cbStatus.IsEnabled = true;
            cbIsActive.IsEnabled = true;
            tbPriceDaytim.IsEnabled = true;
            tbtbPriceOverNight.IsEnabled = true;
            btnSave.Visibility = Visibility.Visible;
            
        }

        private void btnBack_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private async void btnSave_Click(object sender, RoutedEventArgs e)
        {
            int index = ParkingSlots.FindIndex(p => p.Id == Slot.Id);
            var check1 = IsNumber(tbAcreage.Text);
            var check2 = IsImageURL(tbImgSlotUrl.Text);
            var check4 = IsNumber(tbPriceDaytim.Text);
            var check5 = IsNumber(tbtbPriceOverNight.Text);
            if (check1)
            {
                if (check2)
                {
                    if (!string.IsNullOrEmpty(tbNameSlot.Text) && !string.IsNullOrEmpty(tbAcreage.Text) && !string.IsNullOrEmpty(tbImgSlotUrl.Text) && !string.IsNullOrEmpty(((ComboBoxItem)cbStatus.SelectedItem).Content.ToString()) && !string.IsNullOrEmpty(((ComboBoxItem)cbIsActive.SelectedItem).Content.ToString()) && !string.IsNullOrEmpty(tbPriceDaytim.Text) && !string.IsNullOrEmpty(tbtbPriceOverNight.Text))
                    {
                        if (check4 && check5)
                        {
                            ParkingSlots[index].Name = tbNameSlot.Text;
                            ParkingSlots[index].Acreage = tbAcreage.Text;
                            ParkingSlots[index].ImgUrl = tbImgSlotUrl.Text;
                            if (((ComboBoxItem)cbStatus.SelectedItem).Content.ToString() == "Empty")
                            {
                                ParkingSlots[index].status = Status.Empty;
                            }
                            else
                            {
                                ParkingSlots[index].status = Status.Booked;
                            }

                            if(((ComboBoxItem)cbIsActive.SelectedItem).Content.ToString()  == "True")
                            {
                                ParkingSlots[index].IsActive = true;
                            }
                            else
                            {
                                ParkingSlots[index].IsActive = false;
                            }

                            ParkingSlots[index].PriceDaytime = double.Parse(tbPriceDaytim.Text);
                            ParkingSlots[index].PriceOverNight = double.Parse(tbtbPriceOverNight.Text);
                            IFirebaseClient client = new FirebaseClient(config);
                            SetResponse setResponse = await client.SetAsync("ListParkingSlot", ParkingSlots);
                            MessageBox.Show("Update-Success!");
                            this.Close();
                        }
                        else MessageBox.Show("Price must be number!");
                    }
                    else
                    {
                        if (string.IsNullOrEmpty(tbNameSlot.Text))
                        {

                            MessageBox.Show("Sorry you have null-Name.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                        }
                        else if (string.IsNullOrEmpty(tbAcreage.Text))
                        {
                            MessageBox.Show("Sorry you have null-Acreage.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                        }
                        else if (string.IsNullOrEmpty(tbImgSlotUrl.Text))
                        {
                            MessageBox.Show("Sorry you have null-img-url.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                        }
                        else if (string.IsNullOrEmpty(tbPriceDaytim.Text))
                        {
                            MessageBox.Show("Sorry you have null-price-daytim.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                        }
                        else if (string.IsNullOrEmpty(tbtbPriceOverNight.Text))
                        {
                            MessageBox.Show("Sorry you have null-price-OverNight.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                        }
                    }

                }
                else
                {
                    MessageBox.Show("Url-Image must be end with .*jpg or .*png");
                }
            }
            else
            {
                MessageBox.Show("Acreage mmust be number-integer!");
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
            double number;
            return double.TryParse(input, out number);
        }
    }
}
