   M S B A M L   `   `   `  ���� L  HParkingManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null?$clr-namespace:ParkingManagement.RoleParkingManagement.Role  $    ParkingManagement.Role.AddRole   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     6local$clr-namespace:ParkingManagement.Role     -   $��Addrole��  � 
ResizeMode$  CanResizeWithGrip=� � Title$ AddRole��$	��200��$	��650�� � WindowStartupLocation$ CenterScreen=�.���  � RowDefinitions �� $
��auto ��� .+�� $��0��.+��� $��
10,15,10,0q�$��40��$��1q����#058380 �� CornerRadius$ 5��
������� J� Effect 3  -System.Windows.Media.Effects.DropShadowEffect     ShadowDepth$ 2Q�   Opacity$ 4Q�._�� $��Center=�$��Center=�.+��� $��15(����#058380$��DemiBold"�Create-Role� $��1��$	��top=�$��
10 15 10 0q�.+��  � ColumnDefinitions �� �� �� $��80 ��� $��80 �.+�� $��0��.+��� $��Center=�$��5q�.+�� .+��� 
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� $��5q�$��0q�$��15(��� $��	20 -9 0 0q�
�����_�$	��top=�$
��Left=�$��12��$��15��
�������ID� .+��� $��10 5 0 0q�$��10(�
��������� $�Enter Role Id��� $��1��.+��� $��Center=�$��5q�.+�� .+��� 
�������$ 6��$	��1.5q�
�����_�   $ 1Q�$ 5Q�._��� $��5q�$��0q�$��15(��� $
��Left=�$	��Top=�
�����_�$��32��$��15��
�������$��
16,-10,0,0q�Name� .+��� $��10 5 0 0q�$��10(�
��������� $�Enter Role Name��� $��2��.+��� $��75��$��60��.+�� .+��� .+��� $��20��$��2.0 2.0 2.0 0q�
�����_�$ 5 5 0 0��._��� 
�����_�$��DemiBold"�$��Center=�$��14(�$��0,-2,0,2q�Active�� $��20��$��2.0 2.0 2.0 2.0q�
�����_�._��� 
�����_�$�� 0.5 0.5 0.5 0.5q�
�����_�$��24��.@��� $��DemiBold"�True�� $��DemiBold"�False�� $��10(�$��Center=�$��DemiBold"�
�������$	��Top=��� $�Choose Active��� $��3��.+�� $��Center=�$��65��$��40��$��	0 -15 0 0q�.+��� ���#058380	 � Cursor$
	 Hand������ .R��� $��1q����#058380$ 10�����#058380._��� $`��ZE:\Project Code\WPF app\Parking_WPF\ParkingManagement\ParkingManagement\Images\AddIcon.png��$��40��$��20��$��Center=�