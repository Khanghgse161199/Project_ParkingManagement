   M S B A M L   `   `   `  ���� L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:ParkingManagementParkingManagement  Y1clr-namespace:ParkingManagement.View.UserControls#ParkingManagement.View.UserControls  Y1clr-namespace:ParkingManagement.View.UserControls#ParkingManagement.View.UserControls  #    ParkingManagement.LoginWindow   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     1localclr-namespace:ParkingManagement     JUcCutominput1clr-namespace:ParkingManagement.View.UserControls     RUcCutominputPassword1clr-namespace:ParkingManagement.View.UserControls       � Title$  LoginWindow��$	��280��$	��440�� � 
ResizeMode$ NoResize=� � WindowStyle$
 None=� � WindowStartupLocation$ CenterScreen=�.��� .+��� $��4q�
�������$��1q� �� CornerRadius$ 10�� J� Effect 3  -System.Windows.Media.Effects.DropShadowEffect  �  � RowDefinitions �� $
��auto ��� $	��130 ��� $
��auto �.+�� $��0��$��Center=�.+��� $��25(�$��DemiBold"�$��10,20,-10,0q�Login� $��1��$��Center=�$��0 15 5 0q� �� $
��auto ��� .+�� $��0��.+��� .+�5   /ParkingManagement.View.UserControls.Custominput  -     Name$ usInputUsername��$��0 5 0 5q�   	LableText$ UserName��	   Placeholder$	 Enter user-Name��;   5ParkingManagement.View.UserControls.CustomPasswordBox  -   
  Name$
 usInputPassword��$��0 5 0 5q�   	LableText$ Password��� $��1��$��	0 10 0 10q�.+��� $��DemiBold"�$��Center=��� .�Forgot password� $��2��$��Center=�.+�]� .+��� -   $��btnSumit�� � Cursor$
 Hand��$	��150��$��30��$��0 5 2 0q����� .R��� $ 10��
���  �����#ccc$��1q�._��� $��Center=�$��0,5,0,-1q�
�������$��DemiBold"�Submit�� -   $��	btnSighUp��$
 Hand��$	��150��$��30��$��2 5 0 0q����� .R��� $ 10��
��� d ����#ccc$��1q�._��� $��Center=�$��0,5,0,-1q�
�������$��DemiBold"�	Sign-Up