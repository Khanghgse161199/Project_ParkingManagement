   M S B A M L   `   `   `  ���� L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:ParkingManagementParkingManagement  )    #ParkingManagement.SlotParkingWindow   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     1localclr-namespace:ParkingManagement       � Title$  SlotParkingWindow��$
��auto��$	��600��.��� .+�� $��15q� � RowDefinitions �� $
��auto ��� $
��auto ��� .+�� $��0��.+��� $��50��$��1q����#058380 �� CornerRadius$ 5��
������� J� Effect 3  -System.Windows.Media.Effects.DropShadowEffect     ShadowDepth$ 2Q�   Opacity$ 4Q�._�� $��Center=�$��Center=�.+��� $��20(����#058380$��DemiBold"�Slot-Parking-�� .�{$Name-SubParking}� $��1��$��0 10 0 0q�.+��� $ 5��
�������   $ 2Q�$ 2Q�._��� .+��� -   $��	txtFilter��$��5q�$��20���� $	��300��.���� -   $��lvUsers��$��5q�$��0q� �� View �� .P���  �� Width$	 100��.���� -   .��Id �� CellTemplate �� .R�� $��90��.+��� 
���   �$��DemiBold"�$��Center=����� *Id+�� $	 150��.���� -   .��Name �� .R�� $	��140��.+��� 
���   �$��DemiBold"�$��Center=����� *Name+�� $	 150��.���� .��
Time-Price �� .R�� $	��140��.+�9� 	 9� 
IsExpanded$	 False��.���� ���� *	PriceTime+�� $	 100��.���� -   .��
IsActive �� .R�� $��90��.+��� 
���   �$��DemiBold"�$��Center=����� *
IsActive+� $��2��$��0 15 0 0q�.+��� $	��top=�
 �� Orientation$
 
Horizontal=�$��Right=�$��0 0 10 0q�.+��� $	��100��$��35��$��0 10 0 0q����� .R��� 
��� d �$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Add�� $	��100��$��35��$��	15 10 0 0q����� .R��� 
���  ��$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Delete�� $	��100��$��35��$��	15 10 0 0q����� .R��� 
������$��1q�
�������$ 6��._��� 
�������$��Center=�$��Center=�$��18(�$��DemiBold"�Update