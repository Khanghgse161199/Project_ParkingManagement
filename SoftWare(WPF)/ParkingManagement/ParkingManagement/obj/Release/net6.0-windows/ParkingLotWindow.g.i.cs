﻿#pragma checksum "..\..\..\ParkingLotWindow.xaml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5B40964A280163CF88DBAEFEECE57A4BB022A3BC"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using ParkingManagement;
using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Controls.Ribbon;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;


namespace ParkingManagement {
    
    
    /// <summary>
    /// ParkingLotWindow
    /// </summary>
    public partial class ParkingLotWindow : System.Windows.Window, System.Windows.Markup.IComponentConnector {
        
        
        #line 48 "..\..\..\ParkingLotWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBlock tblName;
        
        #line default
        #line hidden
        
        
        #line 97 "..\..\..\ParkingLotWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnHomeWindow;
        
        #line default
        #line hidden
        
        
        #line 113 "..\..\..\ParkingLotWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnProfile;
        
        #line default
        #line hidden
        
        
        #line 331 "..\..\..\ParkingLotWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox txtFilter;
        
        #line default
        #line hidden
        
        
        #line 333 "..\..\..\ParkingLotWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.ListView lvParkingLot;
        
        #line default
        #line hidden
        
        
        #line 403 "..\..\..\ParkingLotWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnSubParking;
        
        #line default
        #line hidden
        
        
        #line 412 "..\..\..\ParkingLotWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnAddParkingLot;
        
        #line default
        #line hidden
        
        
        #line 421 "..\..\..\ParkingLotWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnDelete;
        
        #line default
        #line hidden
        
        
        #line 430 "..\..\..\ParkingLotWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnUpdate;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "7.0.5.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/ParkingManagement;component/parkinglotwindow.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\..\ParkingLotWindow.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "7.0.5.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            this.tblName = ((System.Windows.Controls.TextBlock)(target));
            return;
            case 2:
            this.btnHomeWindow = ((System.Windows.Controls.Button)(target));
            
            #line 97 "..\..\..\ParkingLotWindow.xaml"
            this.btnHomeWindow.Click += new System.Windows.RoutedEventHandler(this.btnHomeWindow_Click);
            
            #line default
            #line hidden
            return;
            case 3:
            this.btnProfile = ((System.Windows.Controls.Button)(target));
            
            #line 113 "..\..\..\ParkingLotWindow.xaml"
            this.btnProfile.Click += new System.Windows.RoutedEventHandler(this.btnProfile_Click);
            
            #line default
            #line hidden
            return;
            case 4:
            this.txtFilter = ((System.Windows.Controls.TextBox)(target));
            
            #line 331 "..\..\..\ParkingLotWindow.xaml"
            this.txtFilter.TextChanged += new System.Windows.Controls.TextChangedEventHandler(this.txtFilter_TextChanged);
            
            #line default
            #line hidden
            return;
            case 5:
            this.lvParkingLot = ((System.Windows.Controls.ListView)(target));
            return;
            case 6:
            
            #line 337 "..\..\..\ParkingLotWindow.xaml"
            ((System.Windows.Controls.GridViewColumnHeader)(target)).Click += new System.Windows.RoutedEventHandler(this.GridViewColumnHeader_Click);
            
            #line default
            #line hidden
            return;
            case 7:
            
            #line 349 "..\..\..\ParkingLotWindow.xaml"
            ((System.Windows.Controls.GridViewColumnHeader)(target)).Click += new System.Windows.RoutedEventHandler(this.GridViewColumnHeader_Click);
            
            #line default
            #line hidden
            return;
            case 8:
            
            #line 361 "..\..\..\ParkingLotWindow.xaml"
            ((System.Windows.Controls.GridViewColumnHeader)(target)).Click += new System.Windows.RoutedEventHandler(this.GridViewColumnHeader_Click);
            
            #line default
            #line hidden
            return;
            case 9:
            
            #line 373 "..\..\..\ParkingLotWindow.xaml"
            ((System.Windows.Controls.GridViewColumnHeader)(target)).Click += new System.Windows.RoutedEventHandler(this.GridViewColumnHeader_Click);
            
            #line default
            #line hidden
            return;
            case 10:
            this.btnSubParking = ((System.Windows.Controls.Button)(target));
            
            #line 403 "..\..\..\ParkingLotWindow.xaml"
            this.btnSubParking.Click += new System.Windows.RoutedEventHandler(this.btnSubParking_Click);
            
            #line default
            #line hidden
            return;
            case 11:
            this.btnAddParkingLot = ((System.Windows.Controls.Button)(target));
            
            #line 412 "..\..\..\ParkingLotWindow.xaml"
            this.btnAddParkingLot.Click += new System.Windows.RoutedEventHandler(this.btnAddParkingLot_Click);
            
            #line default
            #line hidden
            return;
            case 12:
            this.btnDelete = ((System.Windows.Controls.Button)(target));
            
            #line 421 "..\..\..\ParkingLotWindow.xaml"
            this.btnDelete.Click += new System.Windows.RoutedEventHandler(this.btnDelete_Click);
            
            #line default
            #line hidden
            return;
            case 13:
            this.btnUpdate = ((System.Windows.Controls.Button)(target));
            
            #line 430 "..\..\..\ParkingLotWindow.xaml"
            this.btnUpdate.Click += new System.Windows.RoutedEventHandler(this.btnUpdate_Click);
            
            #line default
            #line hidden
            return;
            }
            this._contentLoaded = true;
        }
    }
}

