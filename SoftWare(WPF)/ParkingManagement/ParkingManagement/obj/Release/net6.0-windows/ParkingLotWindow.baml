   M S B A M L   `   `   `  ���� L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:ParkingManagementParkingManagement  (    "ParkingManagement.ParkingLotWindow   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     1localclr-namespace:ParkingManagement       � WindowStartupLocation$  CenterScreen=�$
��auto��$
��1030��.���  � ColumnDefinitions �� $
��auto ��� .+���  �� CornerRadius$ 8��$��0 2 2 2q�
�������$��1�� J� Effect 3  -System.Windows.Media.Effects.DropShadowEffect     ShadowDepth$ 2Q�   Opacity$	 0.3Q�._�� $��0��
������� � RowDefinitions �� $
��auto ��� $
��auto ��� $
��auto ��� .+�� $��0��$��5 10 5 5q�.+��� .+��� 
�������
���   �$	��210��$��4���� $��21(�$
��Bold"�$��Center=�OWNER� $��1��$��5 5 5 5q�$��Center=�.+��� .+�� $	��199��.+��� $��1q�$ 25 20 20 21��
�������
�������$��53��   $ 3Q�$	 0.3Q�._�]� .+��� 
�������$��2q�$ 50,50,50,50��$��50��$��50������  j� Stretch$
 Fill=� �� ImageSource$_ YE:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\avatar.jpg���� -   $��tblName��$��5 0 0 0q�$��16(�$��DemiBold"�$��Center=�Lionel - Benzama�� $��0 15 0 0q�
�������
���   �$	��210��$��4��� $��2��$��5 5 5 5q�.+��� 	 � 	Resources	 
 �� 
TargetType �� Property �� Value   Button.MouseOver.Background �� Color  Button.MouseOver.Border  Button.Pressed.Background  Button.Pressed.Border  Button.Disabled.Background  Button.Disabled.Border  Button.Disabled.Foreground  ButtonCustom �� 
TargetType ��Name J� SnapsToDevicePixels ��Name �� Triggers P� Property P� Value �� 
TargetName��%x  '��       &	  ,     &	 ?     &	 R     &	 e     &	 x     &	 �     &	 �     &	 �     7   7  7  7  7  7  7  '� �    �� "
 ��.���  �@�Cursor$
 Hand���� $ #0ba3a0���� $ #0ba3a0���� $ #25cfcb���� $ #058380���� $ #058380���� $ #058380���� $ #058380���� " ��.R��� $ border��#��z��#��z��#��z��$
 true��._��� $ contentPresenter��$|�False��#��z��#��z��$
��True��# z #��z�� P�  �@��IsDefaulted$
 true��. ��� $ border��# � �� � ��P�  �@J�IsMouseOver$
 true��. ��� $ border��8    � ���� $ border��8   � ��P�  � ��$
 true��. ��� $ border��8   � ���� $ border��8   � ��P�  � {�$ false��. ��� $ border��8   � ���� $ border��8   � ���� $ contentPresenter��8   � ���� "
 �.���  � ��$ 0 15 0 0q�.+�� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� -    ��Name$ btnHomeWindow��$��0q����#058380$��1q����#058380#���  .����  �� Orientation$ 
Horizontal=�.+��� $
��Left=�$a��[E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\HomeIcon.png��$��35��$��25���� $��18(�$��DemiBold"�
�������$��Center=�$
��Home��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� -   $��
btnProfile��$��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�.+��� $
��Left=�$d��^E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ProfileIcon.png��$��40��$��27���� $��18(�$��DemiBold"�
�������$��Center=�$��Profile��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� $��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�$��2 0 0 0q�.+��� $
��Left=�$��7 0 0 0q�$d��^E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ParkingIcon.png��$��32��$��31���� $��18(�$��DemiBold"�
�������$��Center=�$��10 0 0 0q�$��Parking��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� $��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�.+��� $
��Left=�$��0 0 10 0q�$b��\E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\OrderIcon.png��$��30��$��27���� $��18(�$��DemiBold"�$��0 0 5 0q�
�������$��Center=�$
��Left=�$��Orders��$��46��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� $��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�.+��� $`��ZE:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\Payment.png��$��0 0 10 0q�$��30��$��25���� $��18(�$��DemiBold"�
�������$��Center=�$��	0 0 -18 0q�$��Payment��� $��3��.+�� $��0 0 0 25q�$��Bottom=�$��Center=�.+��� .+��� $��18(�$��DemiBold"�
���������  �� TextDecorations$
 none{�
�������.�
Logout ➙� $��1�� �� $��50 ��� �� $��50 �.+�� $��1��$��	0 15 0 15q� �� $
��auto ��� $
��auto ��� $	��330 ��� .+�� $��0�����#F8F8F8.+��� $��50��$��1q����#058380$ 5��
�������   $ 2Q�$ 4Q�._�� $��Center=�$��Center=�.+��� $��20(����#058380$��DemiBold"�1.Parking-Lot-Manager� $��1��$��0 20 0 0q� �� �� �� 	   
gridMargin��%3   &	       �� "
 �.���  � ��$ 10 0 0 0q�.+�� $��0��.+��� $	��220��$��60��
�������$ 5��$
��Left=�   $ 2Q�$ 3Q�._�� .+��� ._��  �� $��70 ��� .+�� .+��� $��10,10,10,10q����� $c ]E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ParkingLot.png��� $��1��.+��� $��Center=�.+��� $
��Bold"�1. Parking-Lot�� $��10(�$��DemiBold"�
��������� $�(Frist Representative)��� $��1��.+��� $	��220��$��60��
�������$ 5��$��Center=�   $ 2Q�$ 3Q�._�� .+��� ._��  �� $��70 ��� .+�� .+��� $��
10,6,10,10q����� $c ]E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ParkingSub.png��� $��1��.+��� $��Center=�.+��� $
��Bold"�2. Parking-Sub�� $��10(�$��DemiBold"�
��������� $�(Second Representative)��� $��2��.+��� $	��220��$��60��
�������$ 5��$��Right=�   $ 2Q�$ 3Q�._�� .+��� ._��  �� $��70 ��� .+�� .+��� $��
10,6,10,10q����� $a [E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\SlotInfo.png��� $��1��.+��� $��Center=�.+��� $
��Bold"�3.Parking-Slot�� $��10(�$��DemiBold"�
��������� $�(Third Representative)��� $��2��$��0 20 0 0q�.+��� $ 5��
�������   $ 2Q�$ 2Q�._��� .+��� -   $��	txtFilter��$��5q�$��20���� .���� -   $��lvParkingLot��$��5q�$��0q� �� View �� .P���  �� Width$	 100��.���� -   .��Id �� CellTemplate �� .R�� $��90��.+��� 
���   �$��DemiBold"�$��Center=����� *Id+�� $	 160��.���� -   .��Name �� .R�� $	��150��.+��� 
���   �$��DemiBold"�$��Center=����� *Name+�� $	 180��.���� -   .��	Address �� .R�� $	��175��.+��� 
���   �$��DemiBold"�$��Center=����� *	Address+�� $	 100��.���� -	   .��
IsActive �� .R�� $��95��.+��� 
���   �$��DemiBold"�$��Center=����� *
IsActive+� $��3��.+��� $ 
Horizontal=�$��Right=�$��0 0 0 0q�.+���  � Cursor$
 Hand��$	��100��$��35��$��
15 10 15 0q����� .R��� 
���OO/�$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�	Re-View�� -
   $��btnSubParking��$
 Hand��$	��130��$��35��$��	3 10 15 0q����� .R��� 
���/kU�$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Sub-Parking�� -   $��btnAddParkingLot��$
 Hand��$	��100��$��35��$��0 10 0 0q����� .R��� 
��� d �$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Add�� -   $��	btnDelete��$
 Hand��$	��100��$��35��$��	15 10 0 0q����� .R��� 
���  ��$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Delete�� -   $��	btnUpdate��$
 Hand��$	��100��$��35��$��	15 10 0 0q����� .R��� 
������$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Update