   M S B A M L   `   `   `  ���� L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:ParkingManagementParkingManagement  U QLiveCharts.Wpf, Version=0.9.7.0, Culture=neutral, PublicKeyToken=0bc1f845d1ebb8dfG4clr-namespace:LiveCharts.Wpf;assembly=LiveCharts.WpfLiveCharts.Wpf "    ParkingManagement.MainWindow   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     1localclr-namespace:ParkingManagement     Dlvc4clr-namespace:LiveCharts.Wpf;assembly=LiveCharts.Wpf       � WindowStartupLocation$  CenterScreen=� � Title$ 
MainWindow��$
��auto��$
��1030��.���  � ColumnDefinitions �� $
��auto ��� .+���  �� CornerRadius$ 8��$��0 2 2 2q�
�������$��1�� J� Effect 3  -System.Windows.Media.Effects.DropShadowEffect     ShadowDepth$ 2Q�   Opacity$	 0.3Q�._�� $��0��
������� � RowDefinitions �� $
��auto ��� $
��auto ��� $
��auto ��� .+�� $��0��$��5 10 5 5q�.+��� .+��� 
�������
���   �$	��210��$��4���� $��21(�$
��Bold"�$��Center=�OWNER� $��1��$��5 5 5 5q�$��Center=�.+��� .+�� $	��199��.+��� $��1q�$ 25 20 20 21��
�������
�������$��53��   $ 3Q�$	 0.3Q�._�]� .+��� 
�������$��2q�$ 50,50,50,50��$��50��$��50������  j� Stretch$
 Fill=�	 �� ImageSource$_	 YE:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\avatar.jpg���� -   $��tblName��$��5 0 0 0q�$��16(�$��DemiBold"�$��Center=�Lionel - Benzama�� $��0 15 0 0q�
�������
���   �$	��210��$��4��� $��2��$��5 5 5 5q�.+��� 
 � 	Resources
  �� 
TargetType �� Property �� Value   Button.MouseOver.Background �� Color  Button.MouseOver.Border  Button.Pressed.Background  Button.Pressed.Border  Button.Disabled.Background  Button.Disabled.Border  Button.Disabled.Foreground  ButtonCustom �� 
TargetType ��Name J� SnapsToDevicePixels ��Name �� Triggers P� Property P� Value �� 
TargetName��%x  '��       &	  ,     &	 ?     &	 R     &	 e     &	 x     &	 �     &	 �     &	 �     7   7  7  7  7  7  7  '� �    �� " ��.���  �@�Cursor$
 Hand���� $ #0ba3a0���� $ #0ba3a0���� $ #25cfcb���� $ #058380���� $ #058380���� $ #058380���� $ #058380���� " ��.R��� $ border��#��z��#��z��#��z��$
 true��._��� $ contentPresenter��$|�False��#��z��#��z��$
��True��# z #��z�� P�  �@��IsDefaulted$
 true��. ��� $ border��# � �� � ��P�  �@J�IsMouseOver$
 true��. ��� $ border��8    � ���� $ border��8   � ��P�  � ��$
 true��. ��� $ border��8   � ���� $ border��8   � ��P�  � {�$ false��. ��� $ border��8   � ���� $ border��8   � ���� $ contentPresenter��8   � ���� " �.���  � ��$ 0 15 0 0q�.+�� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� $��0q����#058380$��1q����#058380#���  .����  �� Orientation$ 
Horizontal=�.+��� $
��Left=�$a��[E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\HomeIcon.png��$��35��$��25���� $��18(�$��DemiBold"�
�������$��Center=�$
��Home��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� -   $��btnProfileWindow��$��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�.+��� $
��Left=�$d��^E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ProfileIcon.png��$��40��$��27���� $��18(�$��DemiBold"�
�������$��Center=�$��Profile��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� -   $��btnParkingWindow��$��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�$��2 0 0 0q�.+��� $
��Left=�$��7 0 0 0q�$d��^E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ParkingIcon.png��$��32��$��31���� $��18(�$��DemiBold"�
�������$��Center=�$��10 0 0 0q�$��Parking��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� $��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�.+��� $
��Left=�$��0 0 10 0q�$b��\E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\OrderIcon.png��$��30��$��27���� $��18(�$��DemiBold"�$��0 0 5 0q�
�������$��Center=�$
��Left=�$��Orders��$��46��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� $��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�.+��� $`��ZE:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\Payment.png��$��0 0 10 0q�$��30��$��25���� $��18(�$��DemiBold"�
�������$��Center=�$��	0 0 -18 0q�$��Payment��� $��3��.+�� $��0 0 0 25q�$��Bottom=�$��Center=�.+��� .+��� $��18(�$��DemiBold"�
���������  �� TextDecorations$
 none{�
�������.�
Logout ➙� $��1�����#F8F8F8 �� $
��auto ��� $
��auto �.+�� $��0�� �� �� �� .+�� .+��� $	��250��$	��135��$ 8��$��	10 22 2 2q�
�������$��1��   $ 4Q�$	 0.3Q�   RenderingBias$ Quality=�._��  �� $
��auto ��� $
��auto �.+�� $��0�� �� $��80 ��� .+�� $��0��.+�� 
��� ���$��40��$��75��$	��Top=�$
��Left=�$��30 0 0 0q�.+��� $��5 0 5 5q�$��Bottom=�$I��CE:\Project Code\Test\TestCustom\TestCustom\Images\SlotisBooking.png��� $��1��.+��� $��Right=�$��0 5 20 0q�$��Medium"�
�������Slot Is Booking� $��
0 25 30 30q�$��45��$��Right=�.+�]� .+��� $��35(�$��Normal"�
�������49/100�� $��2 0 0 5q�$��Bottom=�$��15(�$��Medium"�
�������Slot� $��1��.+�� $	��200��$��10�� � Value$ 49Q�� $��1��.+��� $	��250��$	��135��$ 8��$��	10 22 2 2q�
�������$��1��   $ 4Q�$	 0.3Q�$ Quality=�._��  �� $
��auto ��� $
��auto �.+�� $��0��$��0,0,0,10q� �� $��80 ��� .+�� $��0��.+�� 
��� � �$��40��$��75��$	��Top=�$
��Left=�$��30 0 0 0q�.+��� $��5 0 5 5q�$��Bottom=�$_��YE:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\dollar.png��� $��1��.+��� $��Right=�$��0 5 20 0q�$��Medium"�
�������Total revenue this month� $��
0 25 30 30q�$��45��$��Right=�.+�]� .+��� $��30(�$��0 5 0 0q�$��Normal"�
�������	3567.40�� $��2 0 0 5q�$��Bottom=�$��15(�$��Medium"�
�������$$� $��1��.+��� $��15(�$��DemiBold"�$��Center=�$��
0,-16,0,16q�↗ 34% more than last month� $��2��.+��� $	��250��$	��135��$ 8��$��	10 22 2 2q�
�������$��1��   $ 4Q�$	 0.3Q�$ Quality=�._��  �� $
��auto ��� $
��auto �.+�� $��0�� �� $��80 ��� .+�� $��0��.+�� 
���  ��$��40��$��75��$	��Top=�$
��Left=�$��30 0 0 0q�.+��� $��5 0 5 5q�$��Bottom=�$_��YE:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\Pesons.png��� $��1��.+��� $��Right=�$��0 5 20 0q�$��Medium"�
�������Employee and Suporter� $��
0 28 30 30q�$��45��$��Right=�.+�]� .+��� $��35(�$��Normal"�
�������120�� $��2 0 0 5q�$��Bottom=�$��15(�$��Medium"�
�������	Persons� $��1��.+��� $��12(�$��DemiBold"�$��Center=�$��	0,-7,0,16q��� $
 None{�.�#!Stable and balanced working rules� $��1��.+��� $	��750��
������$��1q�$ 10��$��16q�   $ 3Q�$ 3Q�._�� ���� ���� .+��� .+��� $��35 10q�$��20(�$��DemiBold"�
�������!Customer performance evaluation� $	��300��.+�#  LiveCharts.Wpf.CartesianChart  &   LiveCharts.Wpf.Charts.Base.Chart   LegendLocation$ right=�   Series �� *seriesCollection+   AxisX   LiveCharts.Wpf.Axis     Title$ 
TestLabels��   Labels �� *Labels+    AxisY    $ TestFormatter��!   LabelFormatter! �� *	Formatter+�� $��Center=�$��0 5 0 10q�$��15(�$��DemiBold"�
���   �" Last-Update: 09/05/2023 09:42 AM