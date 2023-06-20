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
using static ParkingManagement.Parking.ParkingSlot;

namespace ParkingManagement.Parking
{
    /// <summary>
    /// Interaction logic for AddSlotParking.xaml
    /// </summary>
    public partial class AddSlotParking : Window
    {
        public string newIdParkingSlot;
        public string IdParkingLot, IdParkingSub;
        public int MaxAmountSlot;
        public int CurrentAmount;
        public List<ParkingSlot> parkingSlots;
        IFirebaseConfig config = new FirebaseConfig() {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        public AddSlotParking(Window owner,string idParkingLot,string idParkingSub,int maxAmount,int currentAmount)
        {
            Owner = owner;
            InitializeComponent();
            IdParkingLot = idParkingLot;
            IdParkingSub = idParkingSub;
            MaxAmountSlot = maxAmount;
            GenerateId();
            tbIdSlot.Text = newIdParkingSlot;       
        }

        private async void btnAdd_Click(object sender, RoutedEventArgs e)
        {
            if(!string.IsNullOrEmpty(tbIdSlot.Text) && !string.IsNullOrEmpty(tbNameSlot.Text) && !string.IsNullOrEmpty(tbAcreage.Text) && !string.IsNullOrEmpty(tbImgSlotUrl.Text) && !string.IsNullOrEmpty(((ComboBoxItem)cbStatus.SelectedItem).Content.ToString()) && !string.IsNullOrEmpty(((ComboBoxItem)cbIsActive.SelectedItem).Content.ToString()) && !string.IsNullOrEmpty(tbPriceDaytim.Text) && !string.IsNullOrEmpty(tbtbPriceOverNight.Text))
            {
                var check = IsNumber(tbPriceDaytim.Text);
                var check2 = IsNumber(tbtbPriceOverNight.Text);
                var check3 = IsNumber(tbAcreage.Text);
                IFirebaseClient client = new FirebaseClient(config);
                FirebaseResponse response = await client.GetAsync("ListParkingSlot");
                parkingSlots = response.ResultAs<List<ParkingSlot>>();
                Func<List<ParkingSlot>, string, bool> checkId = (listParkingSub, idCurrent) =>
                {
                    bool check = false;
                    foreach (var item in listParkingSub)
                    {
                        if ((newIdParkingSlot).ToUpper() == item.Id)
                        {
                            check = true;
                            break;
                        }
                    }
                    return check;
                };
                bool check4 = checkId(parkingSlots, newIdParkingSlot);
                if (check)
                {
                    while (true)
                    {
                        GenerateId();
                        bool check5 = checkId(parkingSlots, newIdParkingSlot);
                        if (!check5) break;
                    }
                }
                if (CurrentAmount <= MaxAmountSlot)
                {
                    if (check3)
                    {
                        if (check && check2)
                        {
                            if (IsImageURL(tbImgSlotUrl.Text))
                            {
                                if (((ComboBoxItem)cbIsActive.SelectedItem).Content.ToString() == "True")
                                {
                                    if (((ComboBoxItem)cbStatus.SelectedItem).Content.ToString() == "Empty")
                                    {
                                        ParkingSlot parkingSlot = new ParkingSlot(tbIdSlot.Text, IdParkingLot, IdParkingSub, tbNameSlot.Text, tbAcreage.Text, tbImgSlotUrl.Text, double.Parse(tbPriceDaytim.Text), double.Parse(tbtbPriceOverNight.Text), Status.Empty, true);
                                        parkingSlots.Add(parkingSlot);
                                        SetResponse setResponse = await client.SetAsync("ListParkingSlot", parkingSlots);
                                        MessageBox.Show("Send data success!");
                                        this.Close();
                                    }
                                    else
                                    {
                                        ParkingSlot parkingSlot = new ParkingSlot(tbIdSlot.Text, IdParkingLot, IdParkingSub, tbNameSlot.Text, tbAcreage.Text, tbImgSlotUrl.Text, double.Parse(tbPriceDaytim.Text), double.Parse(tbtbPriceOverNight.Text), Status.Booked, true);
                                        parkingSlots.Add(parkingSlot);
                                        SetResponse setResponse = await client.SetAsync("ListParkingSlot", parkingSlots);
                                        MessageBox.Show("Send data success!");
                                        this.Close();
                                    }
                                }
                                else
                                {
                                    if (((ComboBoxItem)cbStatus.SelectedItem).Content.ToString() == "Empty")
                                    {
                                        ParkingSlot parkingSlot = new ParkingSlot(tbIdSlot.Text, IdParkingLot, IdParkingSub, tbNameSlot.Text, tbAcreage.Text, tbImgSlotUrl.Text, double.Parse(tbPriceDaytim.Text), double.Parse(tbtbPriceOverNight.Text), Status.Empty, false);
                                        parkingSlots.Add(parkingSlot);
                                        SetResponse setResponse = await client.SetAsync("ListParkingSlot", parkingSlots);
                                        MessageBox.Show("Send data success!");
                                        this.Close();
                                    }
                                    else
                                    {
                                        ParkingSlot parkingSlot = new ParkingSlot(tbIdSlot.Text, IdParkingLot, IdParkingSub, tbNameSlot.Text, tbAcreage.Text, tbImgSlotUrl.Text, double.Parse(tbPriceDaytim.Text), double.Parse(tbtbPriceOverNight.Text), Status.Booked, false);
                                        parkingSlots.Add(parkingSlot);
                                        SetResponse setResponse = await client.SetAsync("ListParkingSlot", parkingSlots);
                                        MessageBox.Show("Send data success!");
                                        this.Close();
                                    }
                                }
                            }
                            else
                            {
                                MessageBox.Show("Sorry img-url must end with .*jng or .*png!");
                            }
                        }
                        else
                        {
                            MessageBox.Show("Sorry price must be Number!!!");
                        }
                    }
                    else
                    {
                        MessageBox.Show("Sorry Acreage must be number");
                    }
                }
                else
                {
                    MessageBox.Show("Sorry Parking Sub-Amount is limit!!!");
                }
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
        private void btnBack_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        public async void GenerateId()
        {
            IFirebaseClient client = new FirebaseClient(config);
            FirebaseResponse response = await client.GetAsync("ListParkingSlot");
            parkingSlots = response.ResultAs<List<ParkingSlot>>();
            string id = "";
            if (parkingSlots.Count > 0)
            {
                foreach (var item in parkingSlots)
                {
                    Random rand = new Random();
                    int randomNumber = rand.Next(0, 101);
                    id = IdParkingSub + "-C" + randomNumber.ToString();
                    if (item.Id != id && !string.IsNullOrEmpty(id)) break;
                }
            }
            else
            {
                Random rand = new Random();
                int randomNumber = rand.Next(0, 101);
                id = IdParkingSub + "-C" + randomNumber.ToString();
            }
            newIdParkingSlot = id;
            tbIdSlot.Text = newIdParkingSlot;
        }
    }
}
