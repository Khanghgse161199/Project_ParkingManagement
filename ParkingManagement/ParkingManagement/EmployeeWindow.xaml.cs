using System;
using System.Collections.Generic;
using System.ComponentModel;
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
    /// Interaction logic for EmployeeWindow.xaml
    /// </summary>
    public partial class EmployeeWindow : Window
    {
        public bool IsSort;
        public EmployeeWindow()
        {
            InitializeComponent();
            List<User2> items = new List<User2>();
            items.Add(new User2 { Name = "Test1", Role = "Employee" ,IsActive = true, Id = 2 });
            items.Add(new User2 { Name = "Test2", Role = "Manager" ,IsActive = false, Id = 1 });
            items.Add(new User2 { Name = "Test3", Role = "Employee" ,IsActive = true, Id = 4 });
            items.Add(new User2 { Name = "Test4", Role = "Manager" ,IsActive = false, Id = 3 });
            lvUsers.ItemsSource = items;
            CollectionView view = (CollectionView)CollectionViewSource.GetDefaultView(lvUsers.ItemsSource);
            view.Filter = UserFilter;
            view.GroupDescriptions.Add(new PropertyGroupDescription("Role"));
        }

        private void txtFilter_TextChanged(object sender, TextChangedEventArgs e)
        {
            CollectionViewSource.GetDefaultView(lvUsers.ItemsSource).Refresh();
        }
        private bool UserFilter(object item)
        {
            if (string.IsNullOrEmpty(txtFilter.Text))
            {
                return true;
            }
            else
            {
                return ((item as User2).Name.IndexOf(txtFilter.Text, StringComparison.OrdinalIgnoreCase) >= 0);
            }
        }

        private void GridViewColumnHeader_Click(object sender, RoutedEventArgs e)
        {
            GridViewColumnHeader header = sender as GridViewColumnHeader;
            CollectionView view = (CollectionView)CollectionViewSource.GetDefaultView(lvUsers.ItemsSource);
            if (IsSort)
            {
                view.SortDescriptions.Clear();
                view.SortDescriptions.Add(new SortDescription(header.Content.ToString(), ListSortDirection.Ascending));
            }
            else
            {
                view.SortDescriptions.Clear();
                view.SortDescriptions.Add(new SortDescription(header.Content.ToString(), ListSortDirection.Descending));
            }
            IsSort = !IsSort;
        }
    }

    public class User2
    {
        public int Id { get; set; }
        public string Role { get; set; }
        public string Name { get; set; }
        public Boolean IsActive { get; set; }

    }
}
