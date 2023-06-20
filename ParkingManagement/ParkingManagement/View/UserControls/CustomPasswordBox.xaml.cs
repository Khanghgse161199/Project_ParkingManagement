﻿using System;
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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ParkingManagement.View.UserControls
{
    /// <summary>
    /// Interaction logic for CustomPasswordBox.xaml
    /// </summary>
    public partial class CustomPasswordBox : UserControl
    {
        private string labelText;

        public string LableText
        {
            get { return labelText; }
            set
            {
                labelText = value;
                lbText.Content = labelText;
            }
        }

        //private string placeholder;

        //public string Placeholder
        //{
        //    get { return placeholder; }
        //    set
        //    {
        //        placeholder = value;
        //        tbPlaceholder.Text = placeholder;
        //    }
        //}

        public CustomPasswordBox()
        {
            DataContext = this;
            InitializeComponent();
        }

        //private void tbPassword_DataContextChanged(object sender, TextChangedEventArgs e)
        //{
        //    if (!string.IsNullOrEmpty(tbPassword.Password))
        //    {
        //        tbPlaceholder.Visibility = Visibility.Hidden;
        //    }
        //    else
        //    {
        //        tbPlaceholder.Visibility = Visibility.Visible;
        //    }
        //}

        
    }
}
