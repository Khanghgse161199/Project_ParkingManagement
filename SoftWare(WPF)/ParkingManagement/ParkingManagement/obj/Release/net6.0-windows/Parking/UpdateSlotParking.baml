   M S B A M L   `   `   `  ���� L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullE'clr-namespace:ParkingManagement.ParkingParkingManagement.Parking  1    +ParkingManagement.Parking.UpdateSlotParking   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     9local'clr-namespace:ParkingManagement.Parking       � WindowStyle$
  None=� � WindowStartupLocation$ CenterOwner=� � Title$ UpdateSlotParking��$
��auto��$	��700��.���  � RowDefinitions �� $
��auto ��� $
��auto ��� $
��auto ��� $
��auto ��� $
��auto ��� .+�� $��0��.+��� $��
10,15,10,0q�$��40��$��1q����#058380 �� CornerRadius$ 5��
������� J� Effect 3  -System.Windows.Media.Effects.DropShadowEffect     ShadowDepth$ 2Q�   Opacity$ 4Q�._�� $��Center=� � ColumnDefinitions �� �� .+�� $��0��.+��� $��Center=�$��15(����#058380$��DemiBold"�Update - Parking Slot� $��1��.+��� -   $��tblIdSlotName��$��Center=�$��15(����#058380$��DemiBold"�� $��1��$��0 15 0 0q�.+�� $��0�� �� .+�� .+�� $��	20 0 20 0q�.+��� .+�� .+��� $��40��
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� -   	 ��Name$	 tbImgSlotUrl��$��Bottom=�$��18(�$��0q�$��5q��� $
��Left=�$��
15 -10 0 0q�$	��Top=�
�����_�$��33��$��15��
�������Image�� $��12 5 0 0q�$��12(�
��������� $"�Enter Slot image-url (.*png)��� $��2��$��0 15 0 0q�.+�� $��0�� �� �� .+�� $��0��.+�� $��	20 0 20 0q�.+��� .+�� .+��� $��40��
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� -   $��	tbAcreage��$��Bottom=�$��18(�$��0q�$��5q��� $
��Left=�$��
15 -10 0 0q�$	��Top=�
�����_�$��44��$��15��
�������	Acreage�� $��12 5 0 0q�$��12(�
��������� $�Enter Slot Acreage��� $��1��.+�� $��	20 0 20 0q�.+��� .+�� .+��� $��40��
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� -   $	 
tbNameSlot��$��Bottom=�$��18(�$��0q�$��5q��� $
��Left=�$��
15 -10 0 0q�$	��Top=�
�����_�$��33��$��15��
�������Name�� $��12 5 0 0q�$��12(�
��������� $�Enter Slot Name��� $��3��$��0 10 0 0q� �� �� .+�� $��0��.+���    $ 2Q�$ 3Q�._�� .+��� .+��� $��Center=�$��70��._��� $��16(�$��DemiBold"�
���   �$��0 0 0 5q�$��Center=�Status�� -   $��cbStatus��$	��Top=�$��Center=����#FFF���#2196F3���#333$��14(�$
��Bold"����� 
 �� 
TargetType"
 ��.���  �� Property � �� �� Value �#333��  � �� ��  �� 
TargetType" ��.R��� #��z��#��z��$��0,0,0,1q�._��� #��z�� �� Padding$ 5q�.@���  �� 
IsSelected$
 true��$��Empty���� $��Booked��� $��1��.+���    $ 2Q�$ 3Q�._�� .+��� .+��� $��Center=�$��70��._��� $��16(�$��DemiBold"�
���   �$��0 0 0 5q�$��Center=�Active�� -   $��
cbIsActive��$	��Top=�$��Center=����#FFF���#2196F3���#333$��14(�$
��Bold"����� "
 ��.���  � �� �#333��  � �� �� " ��.R��� #��z��#��z��$��0,0,0,1q�._��� #��z��$ 5q�.@��� $
 True��$
��True���� $��False��� $��4��$��146,10,132,0q� �� .+�� $��0��.+��� .+��� $	��140��$
��auto��._��� $��DemiBold"�Time-Price (one-day)� $��5q�.+��� $��2q�
�����_�   $ 2Q�$ 3Q�._�� $��5q�.+��� .+�]� .+��� $��70��.��
Daytime:�� -   $	 tbPriceDaytim��$��DemiBold"�$��18(�]� .+��� $��70��.��Over Night:�� -   $	 tbtbPriceOverNight��$��DemiBold"�$��18(�� $��5��$��0 20 0 0q�.+��� -	   $��	stackMain��$	��top=� �� Orientation$ 
Horizontal=�$��Right=�$��0 0 10 0q�.+��� -
   $��	btnUpdate�� � Cursor$
 Hand��$	��100��$��35��$��0 10 0 0q����� .R��� ���#058389$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Update�� -   $��btnSave��$
 Hand��$	��100��$��35��$��	15 10 0 0q����� .R��� 
��� d �$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Save�� -   $��btnBack��$
 Hand��$	��100��$��35��$��	15 10 0 0q����� .R��� 
���  ��$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Back