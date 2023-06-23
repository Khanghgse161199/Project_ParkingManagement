using FireSharp;
using FireSharp.Config;
using FireSharp.Extensions;
using FireSharp.Interfaces;
using FireSharp.Response;
using Newtonsoft.Json.Linq;
using Services.Data;
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
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace ParkingManagement.Parking
{
    /// <summary>
    /// Interaction logic for AddParkingLot.xaml
    /// </summary>
    public partial class AddParkingLot : Window
    {
        public string idAccountOwner;
        private string newIdParking = "";
        List<ParkingLot> parkingLots = new List<ParkingLot>();

        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/", 
        };
       
        public AddParkingLot(Window owner, string idAccountOwner)
        {
            Owner = owner;
            InitializeComponent();
            this.idAccountOwner = idAccountOwner;
            DataContext = this;          
            GenerateId();
            tbIdParkingLot.Text = newIdParking;
        }

        private void btnBack_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private async void btnAdd_Click(object sender, RoutedEventArgs e)
        {         
            if (!string.IsNullOrEmpty(tbIdParkingLot.Text) && !string.IsNullOrEmpty(tbNameParkingLot.Text) && !string.IsNullOrEmpty(tbAddressParkingLot.Text) && !string.IsNullOrEmpty(tbImageParkingLot.Text) && !string.IsNullOrEmpty(((ComboBoxItem)cbActiveParkingLot.SelectedItem).Content.ToString()))
            {
                IFirebaseClient client = new FirebaseClient(config);
                FirebaseResponse response = await client.GetAsync("ListParkingLot");
                parkingLots = response.ResultAs<List<ParkingLot>>();
                Func<List<ParkingLot>,string, bool> checkId = (listParkingLot,idCurrent) =>
                {
                    bool check = false;
                    foreach (var item in listParkingLot)
                    {
                        if((newIdParking).ToUpper() == item.Id)
                        {
                            check = true;
                            break;
                        }
                    }
                    return check;
                };
                bool check = checkId(parkingLots,newIdParking);
                if (check)
                {
                    while (true)
                    {
                        GenerateId();
                        bool check2 = checkId(parkingLots,newIdParking);
                        if (!check2) break;
                    }
                }
                if (((ComboBoxItem)cbActiveParkingLot.SelectedItem).Content.ToString() == "True") {
                    if (IsImageURL(tbImgUrlLot.Text) == true)
                    {
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

                        parkingLots.Add(new ParkingLot(tbIdParkingLot.Text, idAccountOwner, tbNameParkingLot.Text, tbAddressParkingLot.Text, tbImageParkingLot.Text, true,tbImgUrlLot.Text,tbDescriptionLot.Text, isRoof, isGuard));
                        SetResponse setResponse = await client.SetAsync("ListParkingLot", parkingLots);
                        MessageBox.Show("Send success!");
                        this.Close();
                    }
                    else MessageBox.Show("URL path containing the extension .jpg or .png");

                }
                else
                {   
                    if (IsImageURL(tbImgUrlLot.Text) == true)
                    {
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
                        parkingLots.Add(new ParkingLot(tbIdParkingLot.Text, idAccountOwner, tbNameParkingLot.Text, tbAddressParkingLot.Text, tbImageParkingLot.Text, false, tbImgUrlLot.Text,tbDescriptionLot.Text,isRoof,isGuard));
                        SetResponse setResponse = await client.SetAsync("ListParkingLot", parkingLots);
                        MessageBox.Show("Send success!");
                        this.Close();
                    }
                    else MessageBox.Show("URL path containing the extension .jpg or .png");
                }
            }
            else
            {
                if (string.IsNullOrEmpty(tbIdParkingLot.Text))
                {
                    
                    MessageBox.Show("Sorry you have null-Id.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                }else if (string.IsNullOrEmpty(tbNameParkingLot.Text))
                {
                    MessageBox.Show("Sorry you have null-Name.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
                else if (string.IsNullOrEmpty(tbAddressParkingLot.Text))
                {
                    MessageBox.Show("Sorry you have null-Address.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
                else if (string.IsNullOrEmpty(tbImageParkingLot.Text))
                {
                    MessageBox.Show("Sorry you have null-Image-Url.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            

        }


        public static bool checkTmp(string url)
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
        public void GenerateId()
        {
            string id = "";
            if(parkingLots.Count > 0)
            {
                foreach (var item in parkingLots)
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
                id = "A" + randomNumber.ToString();
            }
            newIdParking = id;
        }

       
    }
}
