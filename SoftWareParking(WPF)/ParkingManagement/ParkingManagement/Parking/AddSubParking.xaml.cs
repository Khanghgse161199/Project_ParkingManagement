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
    /// Interaction logic for AddSubParking.xaml
    /// </summary>
    public partial class AddSubParking : Window
    {
        public string IdParkingLot;
        public string newIdParkingSub;
        private string newIdParking = "";
        List<ParkingSub> parkingSubs = new List<ParkingSub>();

        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        public AddSubParking(Window onwer,string idParkingLot)
        {
            Owner = onwer;
            IdParkingLot = idParkingLot;
            InitializeComponent();
            GenerateId();
            tbIdParkingSub.Text = newIdParkingSub;
        }
      

        private async void btnAdd_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrEmpty(tbIdParkingSub.Text) && !string.IsNullOrEmpty(tbNameParkingSub.Text) && !string.IsNullOrEmpty(tbAmountSlot.Text) && !string.IsNullOrEmpty(tbImgParkingSub.Text) && !string.IsNullOrEmpty(((ComboBoxItem)cbIsActive.SelectedItem).Content.ToString()))
            {
                if (IsNumber(tbAmountSlot.Text))
                {
                    IFirebaseClient client = new FirebaseClient(config);
                    FirebaseResponse response = await client.GetAsync("ListParkingSub");
                    parkingSubs = response.ResultAs<List<ParkingSub>>();
                    Func<List<ParkingSub>, string, bool> checkId = (listParkingSub, idCurrent) =>
                    {
                        bool check = false;
                        foreach (var item in listParkingSub)
                        {
                            if ((newIdParking).ToUpper() == item.Id)
                            {
                                check = true;
                                break;
                            }
                        }
                        return check;
                    };
                    bool check = checkId(parkingSubs, newIdParking);
                    if (check)
                    {
                        while (true)
                        {
                            GenerateId();
                            bool check2 = checkId(parkingSubs, newIdParking);
                            if (!check2) break;
                        }
                    }

                    if (((ComboBoxItem)cbIsActive.SelectedItem).Content.ToString() == "True")
                    {
                        if (IsImageURL(tbImgParkingSub.Text) == true)
                        {
                            parkingSubs.Add(new ParkingSub(tbIdParkingSub.Text, IdParkingLot, tbNameParkingSub.Text, tbAmountSlot.Text, tbImgParkingSub.Text, true));
                            SetResponse setResponse = await client.SetAsync("ListParkingSub", parkingSubs);
                            MessageBox.Show("Send success!");
                            this.Close();
                        }
                        else MessageBox.Show("URL path containing the extension .jpg or .png");
                    }
                    else
                    {
                        if (IsImageURL(tbImgParkingSub.Text) == true)
                        {
                            parkingSubs.Add(new ParkingSub(tbIdParkingSub.Text, IdParkingLot, tbNameParkingSub.Text, tbAmountSlot.Text, tbImgParkingSub.Text, false));
                            SetResponse setResponse = await client.SetAsync("ListParkingSub", parkingSubs);
                            MessageBox.Show("Send success!");
                            this.Close();
                        }
                        else MessageBox.Show("URL path containing the extension .jpg or .png");
                    }
                }
                else
                {
                    MessageBox.Show("Sorry Amount must be interger!!!");
                }
            }
            else
            {
                if (string.IsNullOrEmpty(tbIdParkingSub.Text))
                {

                    MessageBox.Show("Sorry you have null-Id.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
                else if (string.IsNullOrEmpty(tbNameParkingSub.Text))
                {
                    MessageBox.Show("Sorry you have null-Name.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
                else if (string.IsNullOrEmpty(tbAmountSlot.Text))
                {
                    MessageBox.Show("Sorry you have null-Address.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
                else if (string.IsNullOrEmpty(tbImgParkingSub.Text))
                {
                    MessageBox.Show("Sorry you have null-Image-Url.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }


        }

        public bool IsNumber(string input)
        {
            int number;
            return int.TryParse(input, out number);
        }
        public static bool IsImageURL(string url)
        {
            return Uri.TryCreate(url, UriKind.Absolute, out Uri uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps)
                && (uriResult.AbsolutePath.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
                    || uriResult.AbsolutePath.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
                    || uriResult.AbsolutePath.EndsWith(".png", StringComparison.OrdinalIgnoreCase));
        }
        public void GenerateId()
        {
            string id = "";
            if (parkingSubs.Count > 0)
            {
                foreach (var item in parkingSubs)
                {
                    Random rand = new Random();
                    int randomNumber = rand.Next(0, 101);
                    id = "A" + randomNumber.ToString();
                    if (item.Id != id && !string.IsNullOrEmpty(id)) break;
                }
            }
            else
            {
                Random rand = new Random();
                int randomNumber = rand.Next(0, 101);
                id = IdParkingLot + "-B" + randomNumber.ToString();
            }
            newIdParkingSub = id;
        }

        private void btnBack_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        //private void btnAdd_Click(object sender, RoutedEventArgs e)
        //{
        //    if(!string.IsNullOrEmpty(tbIdParkingSub.Text) && !string.IsNullOrEmpty(tbNameParkingSub.Text) && !string.IsNullOrEmpty(tbImgParkingSub.Text) && !string.IsNullOrEmpty(tbAmountSSub.Text))
        //    {

        //    }
        //    else
        //    {
        //        MessageBox.Show("You have null- !!!");
        //    }
        //}
    }
}
