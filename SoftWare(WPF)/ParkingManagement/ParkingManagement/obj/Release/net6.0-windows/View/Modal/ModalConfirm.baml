   M S B A M L   `   `   `  ���� L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null?$clr-namespace:ParkingManagement.ViewParkingManagement.View  Y1clr-namespace:ParkingManagement.View.UserControls#ParkingManagement.View.UserControls  )    #ParkingManagement.View.ModalConfirm   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     6local$clr-namespace:ParkingManagement.View     @uc1clr-namespace:ParkingManagement.View.UserControls       � WindowStyle$
  none=� � WindowStartupLocation$ CenterScreen=� � Title$ ModalConfirm��$	��187��$	��400��.��� 
�������.+��  � RowDefinitions �� $
��auto ��� $
��auto ��� $
��auto �.+�� $��0��$��Center=�.+��� $��25(�$��DemiBold"�$��10,20,-10,0q�Enter Password - to confirm!� $��1��$��Center=�$��0 15 5 0q�.+�� .+��� .+�;   5ParkingManagement.View.UserControls.CustomPasswordBox  -     Name$ tbUcPassword��$��34��$	��292��$��0 5 0 5q�   	LableText$ Password��� $��2��$��Center=� � ColumnDefinitions �� �� .+�� $��0��.+��� -   $��
btnConfirm�� � Cursor$
 Hand��$	��150��$��30��$��2 5 0 0q����� .R���  �� CornerRadius$ 10��
���   ����#ccc$��1q�._��� $��Center=�$��0,5,0,-1q�
�������$��DemiBold"�	Confirm� $��1��.+��� -   $��btnBack��$
 Hand��$��80��$��30��$��2 5 0 0q����� .R��� $ 10��
���  �����#ccc$��1q�._��� $��Center=�$��0,5,0,-1q�
�������$��DemiBold"�Back