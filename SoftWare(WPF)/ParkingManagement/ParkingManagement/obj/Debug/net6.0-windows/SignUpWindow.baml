   M S B A M L   `   `   `  ����L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:ParkingManagementParkingManagement  5   	   Y1clr-namespace:ParkingManagement.View.UserControls#ParkingManagement.View.UserControls  5   	   Y1clr-namespace:ParkingManagement.View.UserControls#ParkingManagement.View.UserControls  5   	   $    ParkingManagement.SignUpWindow   5   	   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   1localclr-namespace:ParkingManagement     5   	   JUcCutominput1clr-namespace:ParkingManagement.View.UserControls     5   	   RUcCutominputPassword1clr-namespace:ParkingManagement.View.UserControls     5   	     � Title$  SignUpWindow��5
   	   $
��auto��6   $	��500��6,    � 
ResizeMode$ NoResize=�5   	    � WindowStyle$
 None=�5   	    � WindowStartupLocation$ CenterScreen=�5   	   .��5      � .+�5   
   �� $��4q�6   
�������$��1q�65    �� CornerRadius$ 10��6I    J� Effect 5      3  -System.Windows.Media.Effects.DropShadowEffect  5      6%   5      � 5   
    � RowDefinitions 5      �� 5      $
��auto �6    60   �� 5      $
��auto �6    60   �� 5      $
��auto �6    60   �� 5      6#   .+�5      � $��0��6   $��Center=�6    $��0 20 0 0q�6=   .+�5      �� $��25(�6   $��DemiBold"�6*   $��Sign-Up��6@   5      5      � 5       $��1��6   $��Center=�6    $	��300��6=   $��0 10 0 0q�6I   .+�5!      �  � ColumnDefinitions 5"      �� 5#      6-   �� 5$      6-   .+�5&      � $��0��6   .+�5'      �� .+�5(      �� $��15(�6$   $��0 5 0 0q�62   $��DemiBold"�6C   .��6Y   
First-Name6e   � 5)      .+�5*   "   �� -   5        $��tbInputFirstName��5*   *   $��15(�6B   
������ $��0 0 0 1q�6�    K� ZIndex$ 1��6�   	 �� TextWrapping$
	 Wrap=�6�   6�   �� 5+   "   -   5        $��tbPlaceholder1��5+   *   $��Enter First-Name��6@   
�������$��15(�6o   
������ $��0q�6�   6�   5,      5-      5.      � 5/      $��1��6   $��10 0 0 0q�6+   .+�50      �� .+�51      �� $��15(�6$   $��0 5 0 0q�62   $��DemiBold"�6C   .��6Y   	Last-Name6d   � 52      .+�53   "   �� -   5        $��tbInputLastName��53   *   $��15(�6A   
������ $��0 0 0 1q�6�   $ 1��6�   $
	 Wrap=�6�   6�   �� 54   "   -   5        $��tbPlaceholder2��54   *   $��Enter First-Name��6@   
�������$��15(�6o   
������ $��0q�6�   6�   55      56      57      58      59      � 5:      $��2��6   $��Center=�6    $	��300��6>   $��0 10 0 0q�6J   .+�5;      �� .+�5=      5   /ParkingManagement.View.UserControls.Custominput  -   5        
  Name$
 usUsernameCustom��5=   /   $��0 10 0 0q�6I      	LableText$ UserName��6[      Placeholder$ Enter User-Name��6q   6�   ;   5ParkingManagement.View.UserControls.CustomPasswordBox  5>      -   5          Name$ usPasswordCustom��5>   =   $��0 10 0 0q�6W      	LableText$ Password��6i   6�     5?      -   5        $ usPasswordCfCustom��5?   =   $��0 10 0 0q�6Y   $ 
Confirm-PW��6k   6�     5@      -   5        $
 usEmailCustom��5@   A   $��0 10 0 0q�6/   $ Email��6X   $ Enter Email��6j   6�   5B      5C      � 5D      $��3��6   .+�5E      � $��2��6   $��Center=�6$   $��0 0 0 10q�6A   .+�5F      ]� .+�5G      �� -	   5        $��	btnSignUp��5G   Y    � Cursor$
 Hand��6!   $	��150��6/   $��30��6;   $��2 20 0 0q�6G   ��5H      �� 5I      .R�5J   "   �� $ 10��6)   
��� d ����#ccc$��1q�6e   ._�5K   &   �� $��Center=�60   $��0,5,0,-1q�6M   
�������$��DemiBold"�6r   	Sign-Up6�   5L   #   5M      5O      5P      5Q      5R      5S      5T      5U      