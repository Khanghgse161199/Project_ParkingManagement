   M S B A M L   `   `   `  ���� L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:ParkingManagementParkingManagement  Y1clr-namespace:ParkingManagement.View.UserControls#ParkingManagement.View.UserControls  Y1clr-namespace:ParkingManagement.View.UserControls#ParkingManagement.View.UserControls  $    ParkingManagement.SignUpWindow   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     1localclr-namespace:ParkingManagement     JUcCutominput1clr-namespace:ParkingManagement.View.UserControls     RUcCutominputPassword1clr-namespace:ParkingManagement.View.UserControls       � Title$  SignUpWindow��$
��auto��$	��500�� � 
ResizeMode$ NoResize=� � WindowStyle$
 None=� � WindowStartupLocation$ CenterScreen=�.��� .+��� $��4q�
�������$��1q� �� CornerRadius$ 10�� J� Effect 3  -System.Windows.Media.Effects.DropShadowEffect  �  � RowDefinitions �� $
��auto ��� $
��auto ��� $
��auto ��� .+�� $��0��$��Center=�$��0 20 0 0q�.+��� $��25(�$��DemiBold"�$��Sign-Up��� $��1��$��Center=�$	��300��$��0 10 0 0q�.+��  � ColumnDefinitions �� �� .+�� $��0��.+��� .+��� $��15(�$��0 5 0 0q�$��DemiBold"�.��
First-Name� .+��� -   $��tbInputFirstName��$��15(�
������ $��0 0 0 1q� K� ZIndex$ 1��	 �� TextWrapping$
	 Wrap=��� -   $��tbPlaceholder1��$��Enter First-Name��
�������$��15(�
������ $��0q�� $��1��$��10 0 0 0q�.+��� .+��� $��15(�$��0 5 0 0q�$��DemiBold"�.��	Last-Name� .+��� -   $��tbInputLastName��$��15(�
������ $��0 0 0 1q�$ 1��$
	 Wrap=��� -   $��tbPlaceholder2��$��Enter First-Name��
�������$��15(�
������ $��0q�� $��2��$��Center=�$	��300��$��0 10 0 0q�.+��� .+�5   /ParkingManagement.View.UserControls.Custominput  -   
  Name$
 usUsernameCustom��$��0 10 0 0q�   	LableText$ UserName��   Placeholder$ Enter User-Name��;   5ParkingManagement.View.UserControls.CustomPasswordBox  -     Name$ usPasswordCustom��$��0 10 0 0q�   	LableText$ Password��  -   $ usPasswordCfCustom��$��0 10 0 0q�$ 
Confirm-PW��  -   $
 usEmailCustom��$��0 10 0 0q�$ Email��$ Enter Email��� $��3��.+�� $��2��$��Center=�$��0 0 0 10q�.+�]� .+��� -	   $��	btnSignUp�� � Cursor$
 Hand��$	��150��$��30��$��2 20 0 0q����� .R��� $ 10��
��� d ����#ccc$��1q�._��� $��Center=�$��0,5,0,-1q�
�������$��DemiBold"�	Sign-Up