   M S B A M L   `   `   `  ���� L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:ParkingManagementParkingManagement  %    ParkingManagement.ProfileWindow   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     1localclr-namespace:ParkingManagement       � WindowStartupLocation$  CenterScreen=� � Title$ 
MainWindow��$
��auto��$
��1030��.���  � ColumnDefinitions �� $
��auto ��� .+���  �� CornerRadius$ 8��$��0 2 2 2q�
�������$��1�� J� Effect 3  -System.Windows.Media.Effects.DropShadowEffect     ShadowDepth$ 2Q�   Opacity$	 0.3Q�._�� $��0��
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
 true��. ��� $ border��8   � ���� $ border��8   � ��P�  � {�$ false��. ��� $ border��8   � ���� $ border��8   � ���� $ contentPresenter��8   � ���� " �.���  � ��$ 0 15 0 0q�.+�� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� -    ��Name$ btnHomeWindow��$��0q����#058380$��1q����#058380#���  .����  �� Orientation$ 
Horizontal=�.+��� $
��Left=�$a��[E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\HomeIcon.png��$��35��$��25���� $��18(�$��DemiBold"�
�������$��Center=�$
��Home��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� $��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�.+��� $
��Left=�$d��^E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ProfileIcon.png��$��40��$��27���� $��18(�$��DemiBold"�
�������$��Center=�$��Profile��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� -   $��
btnParking��$��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�$��2 0 0 0q�.+��� $
��Left=�$��7 0 0 0q�$d��^E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\ParkingIcon.png��$��32��$��31���� $��18(�$��DemiBold"�
�������$��Center=�$��10 0 0 0q�$��Parking��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� $��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�.+��� $
��Left=�$��0 0 10 0q�$b��\E:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\OrderIcon.png��$��30��$��27���� $��18(�$��DemiBold"�$��0 0 5 0q�
�������$��Center=�$
��Left=�$��Orders��$��46��� $	��160��$��40��.+��� ���#058380���#058380$��4q�$ 6��._��� $��0q����#058380$��1q����#058380#���  .���� $ 
Horizontal=�.+��� $`��ZE:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\Payment.png��$��0 0 10 0q�$��30��$��25���� $��18(�$��DemiBold"�
�������$��Center=�$��	0 0 -18 0q�$��Payment��� $��3��.+�� $��0 0 0 25q�$��Bottom=�$��Center=�.+��� .+��� $��18(�$��DemiBold"�
���������  �� TextDecorations$
 none{�
�������.�
Logout ➙� $��1�� �� $��50 ��� �� $��50 �.+�� $��1��$��	0 15 0 15q� �� $
��auto ��� .+�� $��0�����#F8F8F8.+��� $��50��$��1q����#058380$ 5��
�������   $ 2Q�$ 4Q�._�� $��Center=�$��Center=�.+��� $��20(����#058380$��DemiBold"�Profile-Owner� $��1��$��0 20 0 0q�.+��  �� $
��auto ��� $
��auto ��� $
��auto ��� $
��auto ��� .+�� $��0�� �� �� .+�� $��0��.+�� $��	20 0 20 0q�.+��� .+�� .+��� $��40��
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� -   $��tbIdInProfile��${�False��$��Bottom=�$��18(�$��0q�$��5q��� $
��Left=�$��
15 -10 0 0q�$	��Top=�
�����_�$��11��$��15��
�������Id� $��1��.+�� $��	20 0 20 0q�.+��� .+�� .+��� $��40��
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� -   $��tbUserNameInProfile��${�False��$��Bottom=�$��0q�$��5q�$��18(��� $��
15 -10 0 0q�$
��Left=�$	��Top=�
�����_�$��61��$��15��
�������	User-Name� $��1��$��0 25 0 0q� �� �� .+�� $��0��.+�� $��	20 0 20 0q�.+��� .+�� .+��� $��40��
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� -   $��tbNameInProfile��${�False��$��Bottom=�$��18(�$��0q�$��5q��� $
��Left=�$��
15 -10 0 0q�$	��Top=�
�����_�$��33��$��15��
�������Name� $��1��.+�� $��	20 0 20 0q�.+��� .+�� .+��� $��40��
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� -   $��tbEmailInProfile��${�False��$��Bottom=�$��0q�$��5q�$��18(��� $��
15 -10 0 0q�$
��Left=�$	��Top=�
�����_�$��29��$��15��
�������Email� $��2��$��0 25 0 0q� �� �� .+�� $��0��.+�� $��	20 0 20 0q�.+��� .+�� .+��� $��40��
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� -   $��tbPhoneInProfile��$��Bottom=�$��18(�$��0q�$��5q��� $
��Left=�$��
15 -10 0 0q�$	��Top=�
�����_�$��35��$��15��
�������Phone�� $��12 5 0 0q�$��12(�
��������� $�Enter Owner Phone-Num��� $��1��.+�� $��	20 0 20 0q�.+��� .+�� .+��� $��40��
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� -	   $��tbAddressInProfile��$��Bottom=�$��0q�$��5q�$��18(��� $��
15 -10 0 0q�$
��Left=�$	��Top=�
�����_�$��44��$��15��
�������	Address�� $��12 5 0 0q�$��12(�
��������� $�Enter Owner Address��� $��3��$��0 25 0 0q�.+�� .+�� $��	20 0 20 0q�.+��� .+�� .+��� $��40��
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� -
   $��tbImgUrlInProfile��$��Bottom=�$��0q�$��5q�$��18(��� $��
15 -10 0 0q�$
��Left=�$	��Top=�
�����_�$��34��$��15��
�������Image�� $��12 5 0 0q�$��12(�
��������� $&� Enter Owner Img-Business-License��� $��4��$��0 20 0 0q�.+���    $ 2Q�$ 3Q�._��  �� �� .+�� $��0��.+�� $	��195��$��35��$��10 0 0 0q�.+��� -   $��	btnUpdate�����#058380 � Cursor$
 Hand��$��0 4 0 0q����� .R��� $��1q�
�������$ 10��
�������._��� $��18(�$��DemiBold"�$��Center=�Update� $��1��.+�� $	��195��$	��Top=�$��35��$��	10 0 0 20q�.+��� -   $��btnSave�����#058380$
 Hand��$��0 4 0 0q����� .R��� $��1q����#058380$ 10�����#058380._��� $��18(�
�������$��DemiBold"�$��Center=�Save