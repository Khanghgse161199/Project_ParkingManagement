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

namespace ParkingManagement.View
{
    /// <summary>
    /// Interaction logic for ModalConfirm.xaml
    /// </summary>
    public partial class ModalConfirm : Window
    {
        public bool check;
        private int count = 0;
        private string UserName;
        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        public ModalConfirm(string userName)
        {
            InitializeComponent();
            UserName = userName;
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
        private async void btnConfirm_Click(object sender, RoutedEventArgs e)
        {
            IFirebaseClient client = new FirebaseClient(config);
            FirebaseResponse responsess = await client.GetAsync("ListAccountOwners");
            var Owners = responsess.ResultAs<List<AcountOwner>>();
            string PassWord = Owners.Where(p => p.account.userName == UserName).FirstOrDefault().account.password;
            if (Decrypt(PassWord,5).ToLower() != tbUcPassword.tbPassword.Password)
            {
                MessageBox.Show("Sorry this password not true!");
                count++;
                if (count == 3)
                {
                    int index = Owners.FindIndex(p => p.account.userName == UserName);
                    Owners[index].isActive = false;                   
                    MessageBox.Show("Sorry input Password is wrong too three time!!!");
                    SetResponse setResponse = await client.SetAsync("ListAccountOwners", Owners);
                    Environment.Exit(0);
                }
            }
            else
            {
                check = true;
                this.Hide();
            }
            
        }

        private void btnBack_Click(object sender, RoutedEventArgs e)
        {
            check = false;
            this.Close();
        }
    }
}
