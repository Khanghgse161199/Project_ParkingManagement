using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using ParkingManagement.Object;
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
    /// Interaction logic for SignUpWindow.xaml
    /// </summary>
    public partial class SignUpWindow : Window
    {
        public SignUpWindow()
        {
            InitializeComponent();
        }

        public static IFirebaseConfig firebaseConfig = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
      

        private void tbInputFirstName_TextChanged(object sender, TextChangedEventArgs e)
        {

            if (!string.IsNullOrEmpty(tbInputFirstName.Text))
            {
                tbPlaceholder1.Visibility = Visibility.Hidden;
            }
            else
            {
                tbPlaceholder1.Visibility = Visibility.Visible;
            }
        }

        private void tbInputLastName_TextChanged(object sender, TextChangedEventArgs e)
        {

            if (!string.IsNullOrEmpty(tbInputLastName.Text))
            {
                tbPlaceholder2.Visibility = Visibility.Hidden;
            }
            else
            {
                tbPlaceholder2.Visibility = Visibility.Visible;
            }
        }

        private async void btnSignUp_Click(object sender, RoutedEventArgs e)
        {
            bool checkNullItem = checkNull(tbInputFirstName.Text, tbInputLastName.Text, usUsernameCustom.tbInput.Text, usPasswordCustom.tbPassword.Password, usPasswordCfCustom.tbPassword.Password, usEmailCustom.tbInput.Text);
            if (checkNullItem)
            {
                string idAccount = GenerateUserID();
                Owner owner = new Owner() { Name = tbInputFirstName.Text + " " + tbInputLastName.Text, Email = usEmailCustom.tbInput.Text,idOwner = idAccount };
                Account account;
                if (usPasswordCustom.tbPassword.Password == usPasswordCfCustom.tbPassword.Password)
                {
                    account = new Account() { userName = usUsernameCustom.tbInput.Text, password = Encrypt(usPasswordCustom.tbPassword.Password, 5) };
                   
                    AcountOwner acountOwner = new AcountOwner(account, owner,true);
                    List<AcountOwner> listAccountOwners = await ListAcountOwners();
                    if(listAccountOwners != null)
                    {
                        listAccountOwners.Add(acountOwner);
                    }

                    IFirebaseClient client = new FirebaseClient(firebaseConfig);
                    SetResponse response = await client.SetAsync("ListAccountOwners", listAccountOwners);
                    if (response != null)
                    {
                        var result = MessageBox.Show("Sign-Up success...", "Let Login now!", MessageBoxButton.YesNo, MessageBoxImage.Asterisk);
                        if (result == MessageBoxResult.Yes)
                        {
                            LoginWindow loginWindow = new LoginWindow();
                            loginWindow.Show();
                            this.Close();
                        }
                    }

                }
                else
                {
                    MessageBox.Show("Sorry-Passwod confrim is not true");
                }
            }
            else
            {
                MessageBox.Show("Not enought data","Warning!!!",MessageBoxButton.OK,MessageBoxImage.Warning);
            }
             
        }

        public string GenerateUserID()
        {
            string id = "";
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            Random rand = new Random();

            for (int i = 0; i < 8; i++)
            {
                id += chars[rand.Next(chars.Length)];
            }

            return id;
        }
        private async Task<List<AcountOwner>> ListAcountOwners()
        {

            IFirebaseClient client = new FirebaseClient(firebaseConfig);
            FirebaseResponse response = await client.GetAsync("ListAccountOwners");
            var list = response.ResultAs<List<AcountOwner>>();
            return list;
        }

        private bool checkNull(string firtsName,string lastName,string username,string password,string passwordCf, string email)
        {
            if (!string.IsNullOrEmpty(firtsName) && !string.IsNullOrEmpty(lastName) && !string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password) && !string.IsNullOrEmpty(passwordCf) && !string.IsNullOrEmpty(email)){
                return true;
            }else return false;
        }

        public static string Encrypt(string input, int key)
        {
            string output = "";
            foreach (char item in input)
            {
                if (char.IsLetter(item))
                {
                    char newChar = (char)(((char.ToUpper(item) - 'A' + key) % 26) + 'A');
                    output += newChar;
                }
                else
                {
                    output += item;
                }
            }
            return output;
        }
        public bool IsEmail(string input)
        {
            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            return regex.IsMatch(input);
        }
    }
}
