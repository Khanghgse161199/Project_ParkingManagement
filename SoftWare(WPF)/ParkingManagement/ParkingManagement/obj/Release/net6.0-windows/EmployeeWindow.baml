   M S B A M L   `   `   `  ���� L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:ParkingManagementParkingManagement  &     ParkingManagement.EmployeeWindow   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     1localclr-namespace:ParkingManagement       � Title$  EmployeeWindow��$
��auto��$
��1030��.���  � ColumnDefinitions �� $
��auto ��� .+���  �� CornerRadius$ 8��$��0 2 2 2q�
�������$��1�� J� Effect 3  -System.Windows.Media.Effects.DropShadowEffect     ShadowDepth$ 2Q�   Opacity$	 0.3Q�._�� $��0��
������� � RowDefinitions �� $
��auto ��� $
��auto ��� $
��auto ��� $
��auto ��� $
��auto �.+�� $��0��$��5 10 5 5q�.+��� .+��� $��18(�$
��Bold"�$��Center=�
Hi-Manager�� 
�������
���   �$	��210��$��4��� $��1��$��5 5 5 5q�$��Center=�.+��� .+�� $	��199��.+��� $��1q�$ 25 20 20 21��
�������
�������$��53��   $ 3Q�$	 0.3Q�._�]� .+��� 
�������$��2q�$ 50,50,50,50��$��50��$��50������  j� Stretch$
 Fill=� �� ImageSource$_ YE:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\avatar.jpg���� -   $��tblName��$��5 0 0 0q�$��16(�$��DemiBold"�$��Center=�Lionel - Benzama�� $��0 15 0 0q�
�������
���   �$	��210��$��4��� $��2��$��5 5 5 5q�.+��� 	 � 	Resources	 
 �� 
TargetType �� Property �� Value��%6   '��       �� "
 ��.���  �@�Cursor$
 Hand��.+�� $	��160��$��40��.+��� ���#058380���� .R��� $��1q����#058380$ 6�����#058380._���  �� Orientation$ 
Horizontal=�.+��� $a��[E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\HomeIcon.png��$��40��$��20��$��15,0,5,0q��� $��18(�$��DemiBold"�$��Center=�$
��Home��$��10 0 0 0q�� $	��160��$��40��$��0 12 0 0q�.+��� ���#058380���� .R��� $��1q����#058380$ 6�����#058380._��� $ 
Horizontal=�.+��� $d��^E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ProfileIcon.png��$��40��$��30��$��15,0,5,0q��� $��18(�$��DemiBold"�$��Center=�$��Profile��$��10 0 0 0q�� $	��160��$��40��$��0 12 0 0q�.+��� ���#058380���� .R��� $��1q����#058380$ 6�����#058380._��� $ 
Horizontal=�.+��� $a��[E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\RoleIcon.jpg��$��40��$��30��$��15,0,5,0q��� $��18(�$��DemiBold"�$��Center=�$��Roles��$��10 0 0 0q�� $	��160��$��40��$��0 12 0 0q�.+��� ���#058380���� .R��� $��1q����#058380$ 6�����#058380._��� $ 
Horizontal=�.+��� $e��_E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\EmployeeIcon.png��$��40��$��30��$��15,0,5,0q��� $��18(�$��DemiBold"�$��Center=�$��	Employees��$��5 0 0 0q�� $	��160��$��40��$��0 12 0 0q�.+��� ���#058380���� .R��� $��1q����#058380$ 6�����#058380._��� $ 
Horizontal=�.+��� $d��^E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ParkingIcon.png��$��50��$��30��$��10,0,5,0q��� $��18(�$��DemiBold"�$��Center=�$��Parking��$��0 0 0 0q�� $	��160��$��40��$��0 12 0 0q�.+��� ���#058380���� .R��� $��1q����#058380$ 6�����#058380._��� $ 
Horizontal=�.+��� $b��\E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\OrderIcon.png��$��40��$��30��$��15,0,5,0q��� $��18(�$��DemiBold"�$��Center=�$��Orders��$��10 0 0 0q�� $	��160��$��40��$��0 12 0 0q�.+��� ���#058380���� .R��� $��1q����#058380$ 6�����#058380._��� $ 
Horizontal=�.+��� $`��ZE:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\Payment.png��$��40��$��30��$��15,0,5,0q��� $��18(�$��DemiBold"�$��Center=�$��Payment��$��10 0 0 0q�� $��3��.+�� $��	15 15 5 5q�$��Center=�.+��� .+��� $��18(�$��DemiBold"�
���������  �� TextDecorations$
 none{�
�������.�
Logout ➙� $��1�� �� $��50 ��� �� $��50 �.+�� $��1��$��	0 15 0 15q� �� $
��auto ��� $
��auto ��� $	��330 ��� .+�� $��0�����#F8F8F8.+��� $��50��$��1q����#058380$ 5��
�������   $ 2Q�$ 4Q�._�� $��Center=�$��Center=�.+��� $��20(����#058380$��DemiBold"�Employee-Manager� $��1��$��0 20 0 0q� �� �� �� 	    
gridMargin��%3   &	        �� "
 �.���  � ��$ 10 0 0 0q�.+�� $��0��.+��� $	��220��$��60��
�������$ 5��$
��Left=�   $ 2Q�$ 3Q�._�� .+��� ._��  �� $��70 ��� .+�� .+��� $��
10,6,10,10q����� $e _E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\MoreEmployee.png��� $��1��.+��� $��Center=�.+��� $
��Bold"�12+ Employee�� $��10(�$��DemiBold"�
��������� $�(Last-update: 9/5/2023)��� $��1��.+��� $	��220��$��60��
�������$ 5��$��Center=�   $ 2Q�$ 3Q�._�� .+��� ._��  �� $��70 ��� .+�� .+��� $��
10,6,10,10q����� $f `E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\FiredEmployee.png��� $��1��.+��� $��Center=�.+��� $
��Bold"�5- Employee�� $��10(�$��DemiBold"�
��������� $�(Last-update: 9/5/2023)��� $��2��.+��� $	��220��$��60��
�������$ 5��$��Right=�   $ 2Q�$ 3Q�._�� .+��� ._��  �� $��70 ��� .+�� .+��� $��
10,6,10,10q����� $f `E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\StatsEmployee.png��� $��1��.+��� $��Center=�.+��� $
��Bold"�4% Employee�� $��10(�$��DemiBold"�
��������� $�(Last-update: 9/5/2023)��� $��2��$��0 20 0 0q�.+��� $ 5��
�������   $ 2Q�$ 2Q�._��� .+��� -   $��	txtFilter��$��5q�$��20���� -   $��lvUsers��$��5q�$��0q� �� View �� .P���  �� Width$	 100��.���� -   .��Id �� CellTemplate �� .R�� $��90��.+��� 
���   �$��DemiBold"�$��Center=����� *Id+�� $	 150��.���� -   .��Name �� .R�� $	��140��.+��� 
���   �$��DemiBold"�$��Center=����� *Name+�� $	 100��.���� -   .��
IsActive �� .R�� $��90��.+��� 
���   �$��DemiBold"�$��Center=����� *
IsActive+ �� 
GroupStyle (  "System.Windows.Controls.GroupStyle     ContainerStyle �� "
 ��.���  � �� �� .R�9�  9� 
IsExpanded$
 true������ $ 
Horizontal=�.+��� $
��Bold"�
�������$��22(�$��Bottom=����� *Name+�� $��22(�
��� � �$
��Bold"�$��Italic$�$��10,0,0,0q�$��Bottom=����� *	ItemCount+.���� � $��3��.+��� $ 
Horizontal=�$��Right=�$��0 0 10 0q�.+��� $	��100��$��35��$��0 10 0 0q����� .R��� 
��� d �$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Add�� $	��100��$��35��$��	15 10 0 0q����� .R��� 
���  ��$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Delete�� $	��100��$��35��$��	15 10 0 0q����� .R��� 
������$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Update