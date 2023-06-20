using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using LiveCharts;
using LiveCharts.Wpf;
using ParkingManagement.Employee;
using ParkingManagement.Object;
using ParkingManagement.Parking;
using ParkingManagement.Role;
using ParkingManagement.View;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ParkingManagement
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window,INotifyPropertyChanged
    {
        public List<AcountOwner> acountOwners;
        public event PropertyChangedEventHandler? PropertyChanged;
        public string idAccountOwner;
        private AcountOwner AccountOwner;
        public bool check;
        public static IFirebaseConfig firebaseConfig = new FirebaseConfig()
        {
            AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
            BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",
        };
        protected virtual void OnPropertyChanged([CallerMemberName]  string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        public SeriesCollection seriesCollection { get; set; }
        public string[] Labels { get; set; }
        public Func<double,string> Formatter { get; set; }
        public MainWindow(bool check,string idOwner)
        {           
            if (!string.IsNullOrEmpty(idOwner))
            {
                idAccountOwner = idOwner;               
            }
            
            if (check)
            {
               
                InitializeComponent();
                DataContext = this;
                acountOwners = new List<AcountOwner>();
                getData();
                seriesCollection = new SeriesCollection() {
                new ColumnSeries {
                    Title = "Good",
                    Values = new ChartValues<double> {10 , 50 , 39}
                },
                 new ColumnSeries {
                    Title = "Medium",
                    Values = new ChartValues<double> {10 , 50 , 39}
                },
                new ColumnSeries {
                        Title = "Bad",
                        Values = new ChartValues<double> {5 , 30 , 60}
                },
            };

                Labels = new[] { "April", "May", "June" };
                Formatter = value => value.ToString("N");
            }
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
            AccountOwner = acountOwners.Where(q => q.owner.idOwner == idAccountOwner).FirstOrDefault();
           
        }
        public MainWindow()
        {                         
                this.Hide();
                LoginWindow loginWindow = new LoginWindow();
                this.Close();
                loginWindow.ShowDialog();              
           
        }

        private void btnProfileWindow_Click(object sender, RoutedEventArgs e)
        {           
            ProfileWindow profileWindow = new ProfileWindow(idAccountOwner);
            this.Close();
            profileWindow.ShowDialog();
        }

        private void btnParkingWindow_Click(object sender, RoutedEventArgs e)
        {
            if(!string.IsNullOrEmpty(AccountOwner.owner.Phone) && !string.IsNullOrEmpty(AccountOwner.owner.Address) && !string.IsNullOrEmpty(AccountOwner.owner.Image))
            {
                ParkingLotWindow parkingLotWindow = new ParkingLotWindow(idAccountOwner);
                this.Close();
                parkingLotWindow.ShowDialog();
            }
            else
            {
                var result = MessageBox.Show("Sorry - Profile is lack of information!", "Warning! \n (Let fill information into profile.)", MessageBoxButton.YesNo,MessageBoxImage.Error);
                if (result == MessageBoxResult.Yes)
                {
                    ProfileWindow profileWindow = new ProfileWindow(idAccountOwner);
                    this.Close();
                    profileWindow.ShowDialog();
                }
            }                
        }
        private void btnOrder_Click(object sender, RoutedEventArgs e)
        {
            OrderWindow orderWindow = new OrderWindow(idAccountOwner);
            this.Close();
            orderWindow.ShowDialog();
        }

        private void Hyperlink_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
