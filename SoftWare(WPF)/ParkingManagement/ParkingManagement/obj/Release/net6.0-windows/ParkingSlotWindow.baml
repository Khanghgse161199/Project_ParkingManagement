   M S B A M L   `   `   `  ���� L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:ParkingManagementParkingManagement  )    #ParkingManagement.ParkingSlotWindow   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     1localclr-namespace:ParkingManagement       � WindowStyle$
  None=� � WindowStartupLocation$ CenterOwner=� � Title$ ParkingSlotWindow��$
��auto��$	��800��.���  � ColumnDefinitions �� $��50 ��� �� $��50 �.+�� $��1��$��	0 15 0 15q� � RowDefinitions �� $
��auto ��� $
��auto ��� $	��330 ��� .+�� $��0�����#F8F8F8.+��� $��50��$��1q����#058380 �� CornerRadius$ 5��
������� J� Effect 3  -System.Windows.Media.Effects.DropShadowEffect     ShadowDepth$ 2Q�   Opacity$ 4Q�._��  �� �� .+�� $��0��.+�� $��Center=�$��Center=�.+��� $��20(����#058380$��DemiBold"�3.Parking-Slot-Manager� $��1��.+�� $��Center=�$��Center=�.+��� -   $��tblIdParkingSub��$��Right=�$��20(����#058380$��DemiBold"�� $��1��$��0 20 0 0q� �� �� �� 	 � 	Resources	 
 �� 
TargetType   
gridMargin �� Property �� Value��%3   &	        �� "
 �.���  � ��$ 10 0 0 0q�.+�� $��0��.+��� $	��220��$��60��
�������$ 5��$
��Left=�   $ 2Q�$ 3Q�._�� .+��� ._��  �� $��70 ��� .+�� .+��� $��10,10,10,10q�����  �� ImageSource$c ]E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ParkingLot.png��� $��1��.+��� $��Center=�.+��� $
��Bold"�1. Parking-Lot�� $��10(�$��DemiBold"�
��������� $�(Frist Representative)��� $��1��.+��� $	��220��$��60��
�������$ 5��$��Center=�   $ 2Q�$ 3Q�._�� .+��� ._��  �� $��70 ��� .+�� .+��� $��
10,6,10,10q����� $c ]E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ParkingSub.png��� $��1��.+��� $��Center=�.+��� $
��Bold"�2. Parking-Sub�� $��10(�$��DemiBold"�
��������� $�(Second Representative)��� $��2��.+��� $	��220��$��60��
�������$ 5��$��Right=�   $ 2Q�$ 3Q�._�� .+��� ._��  �� $��70 ��� .+�� .+��� $��
10,6,10,10q����� $a [E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\SlotInfo.png��� $��1��.+��� $��Center=�.+��� $
��Bold"�3.Parking-Slot�� $��10(�$��DemiBold"�
��������� $�(Third Representative)��� $��2��$��0 20 0 0q�.+��� $ 5��
�������   $ 2Q�$ 2Q�._��� .+��� -   $��	txtFilter��$��5q�$��20���� $	��200��.���� -   $��lvParkingSlot��$��5q�$��0q� �� View �� .P���  �� Width$	 120��.���� -   .��Id �� CellTemplate �� .R�� $	��115��.+��� 
���   �$��DemiBold"�$��Center=����� *Id+�� $	 100��.���� -   .��Name �� .R�� $��95��.+��� 
���   �$��DemiBold"�$��Center=����� *Name+�� $ 90��.���� -   .��	Acreage �� .R�� $��80��.+��� 
���   �$��DemiBold"�$��Center=����� *	Acreage+�� $	 110��.���� -   .��PriceDaytime �� .R�� $	��100��.+��� 
���   �$��DemiBold"�$��Center=����� *PriceDaytime+�� $	 110��.���� -   .��PriceOverNight �� .R�� $	��100��.+��� 
���   �$��DemiBold"�$��Center=����� *PriceOverNight+�� $ 80��.���� -	   .��
IsActive �� .R�� $��70��.+��� 
���   �$��DemiBold"�$��Center=����� *
IsActive+ �� 
GroupStyle (  "System.Windows.Controls.GroupStyle     ContainerStyle �� "
 ��.���  � �� �� .R�9�  9� 
IsExpanded$
 true������  �� Orientation$ 
Horizontal=�.+��� $
��Bold"�
�������$��22(�$��Bottom=����� *Name+�� $��22(�
��� � �$
��Bold"�$��Italic$�$��10,0,0,0q�$��Bottom=����� *	ItemCount+.���� � $��3��.+��� $ 
Horizontal=�$��Right=�$��0 0 0 0q�.+��� -
   $��btnAddParkingSlot�� � Cursor$
 Hand��$	��100��$��35��$��0 10 0 0q����� .R��� 
��� d �$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Add�� -   $��	btnDelete��$
 Hand��$	��100��$��35��$��	15 10 0 0q����� .R��� 
���  ��$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Delete�� -   $��	btnUpdate��$
 Hand��$	��100��$��35��$��	15 10 0 0q����� .R��� 
������$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Update�� -    ��Name$ btnBack��$
 Hand��$	��100��$��35��$��	15 10 0 0q����� .R��� 
���-R��$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Back