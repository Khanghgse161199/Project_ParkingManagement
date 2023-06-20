using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using ParkingManagement.Object;
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

namespace ParkingManagement
{
    /// <summary>
    /// Interaction logic for LoginWindow.xaml
    /// </summary>
    public partial class LoginWindow : Window
    {
        public string idAccounOwner;
        public static IFirebaseConfig firebaseConfig = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };

        public bool CheckLogin;
        public LoginWindow()
        {
            InitializeComponent();
        }

        private async void btnSumit_Click(object sender, RoutedEventArgs e)
        {
            AcountOwner acountOwner = null;
            IFirebaseClient client = new FirebaseClient(firebaseConfig);
            FirebaseResponse response = await client.GetAsync("ListAccountOwners");
            var rusltListAccountOwners = response.ResultAs<List<AcountOwner>>();
            Func<List<AcountOwner>,bool> checkExist = (listAccount) =>
            {             
                var check = false;
                foreach (var item in listAccount)
                {
                    if (item.account.userName == usInputUsername.tbInput.Text)
                    {
                        string passtmp = Decrypt(item.account.password, 5);
                        if (passtmp.ToLower() == usInputPassword.tbPassword.Password)
                        {                     
                            check = true;
                            CheckLogin = true;
                            idAccounOwner = item.owner.idOwner;
                            acountOwner = item;
                            break;
                        }
                    }
                }
                return check;
            };
            bool check = checkExist(rusltListAccountOwners);
            if (check)
            {
                if (acountOwner.isActive == true)
                {
                    MainWindow mainWindow = new MainWindow(true, idAccounOwner);
                    mainWindow.Show();
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Your Accoutn was blocked.", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Warning);
                }
            }
            else
            {
                MessageBox.Show("UserName or Password is wrong", "Warning!!!", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }
        public static string Decrypt(string input, int key)
        {
            string output = "";
            foreach (char c in input)
            {
                if (char.IsLetter(c))
                {
                    char newChar = (char)(((char.ToUpper(c) - 'A' - key + 26) % 26) + 'A');
                    output += newChar;
                }
                else
                {
                    output += c;
                }
            }
            return output;
        }

        private void btnSighUp_Click(object sender, RoutedEventArgs e)
        {
            SignUpWindow signUpWindow = new SignUpWindow();
            signUpWindow.ShowDialog();
            this.Close();
        }
    }
}
