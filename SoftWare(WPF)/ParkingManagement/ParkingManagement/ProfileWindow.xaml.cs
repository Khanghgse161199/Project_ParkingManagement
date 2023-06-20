using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using ParkingManagement.Object;
using ParkingManagement.Parking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace ParkingManagement
{
    /// <summary>
    /// Interaction logic for ProfileWindow.xaml
    /// </summary>
    public partial class ProfileWindow : Window
    {
        private AcountOwner AccountOwner;
        public List<AcountOwner> acountOwners;
        public static IFirebaseConfig firebaseConfig = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };

        public string IdAccountOwner;
        public ProfileWindow(string idAccountOwner)
        {
            InitializeComponent();
            acountOwners = new List<AcountOwner>();
            IdAccountOwner = idAccountOwner;
            getData();       
            
        }
        public async void getData()
        {
            IFirebaseClient client = new FirebaseClient(firebaseConfig);
            FirebaseResponse response = await client.GetAsync("ListAccountOwners");
            var AccountList = response.ResultAs<List<AcountOwner>>();
            foreach (AcountOwner item in AccountList)
            {
                acountOwners.Add(item);
            }
            AccountOwner = acountOwners.Where(q => q.owner.idOwner == IdAccountOwner).FirstOrDefault();
            tbIdInProfile.Text = AccountOwner.owner.idOwner;
            tbUserNameInProfile.Text = AccountOwner.account.userName;
            tbNameInProfile.Text = AccountOwner.owner.Name;
            tbEmailInProfile.Text = AccountOwner.owner.Email;
            if (!string.IsNullOrEmpty(AccountOwner.owner.Phone) && !string.IsNullOrEmpty(AccountOwner.owner.Address) && !string.IsNullOrEmpty(AccountOwner.owner.Image))
            {
                tbPhoneInProfile.Text = AccountOwner.owner.Phone;
                tbPhoneInProfile.IsEnabled = false;
                tbAddressInProfile.Text = AccountOwner.owner.Address;
                tbAddressInProfile.IsEnabled = false;
                tbImgUrlInProfile.Text = AccountOwner.owner.Image;
                tbImgUrlInProfile.IsEnabled = false;
            }
        }
        private void btnHomeWindow_Click(object sender, RoutedEventArgs e)
        {
            MainWindow mainWindow = new MainWindow(true,IdAccountOwner);
            mainWindow.Show();
            this.Close();
        }

        private void btnParking_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrEmpty(AccountOwner.owner.Phone) && !string.IsNullOrEmpty(AccountOwner.owner.Address) && !string.IsNullOrEmpty(AccountOwner.owner.Image))
            {
                ParkingLotWindow parkingLotWindow = new ParkingLotWindow(AccountOwner.owner.idOwner);
                this.Close();
                parkingLotWindow.ShowDialog();
            }
            else
            {
                var result = MessageBox.Show("Sorry - Profile is lack of information!", "Warning! \n (Let fill information into profile.)", MessageBoxButton.OK, MessageBoxImage.Error);              
            }
        }

        private async void btnSave_Click(object sender, RoutedEventArgs e)
        {
            if(!string.IsNullOrEmpty(tbPhoneInProfile.Text) && !string.IsNullOrEmpty(tbAddressInProfile.Text) && !string.IsNullOrEmpty(tbImgUrlInProfile.Text))
            {
                var check1 = IsPhoneNumber(tbPhoneInProfile.Text);
                var check2 = IsImageURL(tbImgUrlInProfile.Text);
                if (check1)
                {
                    if (check2)
                    {
                        IFirebaseClient client = new FirebaseClient(firebaseConfig);
                        int index = acountOwners.FindIndex(q => q.owner.idOwner == IdAccountOwner);
                        acountOwners[index].owner.Name = tbNameInProfile.Text;
                        acountOwners[index].owner.Email = tbEmailInProfile.Text;
                        acountOwners[index].owner.Phone = tbPhoneInProfile.Text;
                        acountOwners[index].owner.Address = tbAddressInProfile.Text;
                        acountOwners[index].owner.Image = tbImgUrlInProfile.Text;
                        SetResponse setResponse = await client.SetAsync("ListAccountOwners", acountOwners);
                        MessageBox.Show("Save finish", "Success", MessageBoxButton.OK, MessageBoxImage.None);
                        tbNameInProfile.IsEnabled = false;
                        tbEmailInProfile.IsEnabled = false;
                        tbPhoneInProfile.IsEnabled = false;
                        tbAddressInProfile.IsEnabled = false;
                        tbImgUrlInProfile.IsEnabled = false;
                    }
                    else
                    {
                        MessageBox.Show("Image must be end with .*png or .*jpg");
                    }
                }
                else
                {
                    MessageBox.Show("Phone is wrong-format");
                }
            }
            else
            {
                if (string.IsNullOrEmpty(tbPhoneInProfile.Text))
                {
                    MessageBox.Show("you have null - phone!");
                }else if (string.IsNullOrEmpty(tbAddressInProfile.Text))
                {
                    MessageBox.Show("you have null - Address!");
                }else if (string.IsNullOrEmpty(tbImgUrlInProfile.Text))
                {
                    MessageBox.Show("you have null - Img-Url!");
                }
            }

        }
        public bool IsPhoneNumber(string input)
        {
            Regex regex = new Regex(@"^(03|05|07|08|09)+([0-9]{8})$");
            return regex.IsMatch(input);
        }
        public static bool IsImageURL(string url)
        {
            return Uri.TryCreate(url, UriKind.Absolute, out Uri uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps)
                && (uriResult.AbsolutePath.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
                    || uriResult.AbsolutePath.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
                    || uriResult.AbsolutePath.EndsWith(".png", StringComparison.OrdinalIgnoreCase));
        }

        private async void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            tbNameInProfile.IsEnabled = true;
            tbEmailInProfile.IsEnabled = true;
            tbPhoneInProfile.IsEnabled = true;         
            tbAddressInProfile.IsEnabled = true;           
            tbImgUrlInProfile.IsEnabled = true;            
        }

        private void btnOrderCliked_Click(object sender, RoutedEventArgs e)
        {
            OrderWindow orderWindow = new OrderWindow(IdAccountOwner);
            this.Close();
            orderWindow.Show();
        }
    }
}
