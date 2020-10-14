using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SensorTest
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            serialPort1.PortName = "COM" + numericUpDown1.Value;
            serialPort1.BaudRate = 57600;
            serialPort1.DataBits = 8;
            serialPort1.Parity = System.IO.Ports.Parity.None;
            serialPort1.StopBits = System.IO.Ports.StopBits.One;
            serialPort1.NewLine = "\r";
            serialPort1.DtrEnable = false;
            serialPort1.RtsEnable = false;
            serialPort1.Open();

        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            try
            {
                lblRange1.Text = (trackBar1.Value * 10).ToString("0000");
                lblRange2.Text = (trackBar2.Value * 10).ToString("0000");
                if (serialPort1.IsOpen)
                {
                    btnConnect1.Text = "Connected!";
                    serialPort1.WriteLine("R" + (trackBar1.Value * 10).ToString("0000"));
                }
                else
                {
                    btnConnect1.Text = "Connect";
                }
                if (serialPort2.IsOpen)
                {
                    button1.Text = "Connected!";
                    serialPort2.WriteLine("R" + (trackBar2.Value * 10).ToString("0000"));
                }
                else
                {
                    button1.Text = "Connect";
                }
            }
            catch (Exception)
            {

            }
        }

        private void Form1_Deactivate(object sender, EventArgs e)
        {
            //serialPort1.Close();
        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            serialPort2.PortName = "COM" + numericUpDown2.Value;
            serialPort2.BaudRate = 57600;
            serialPort2.DataBits = 8;
            serialPort2.Parity = System.IO.Ports.Parity.None;
            serialPort2.StopBits = System.IO.Ports.StopBits.One;
            serialPort2.NewLine = "\r";
            serialPort2.DtrEnable = false;
            serialPort2.RtsEnable = false;
            serialPort2.Open();
        }

        private void label4_Click(object sender, EventArgs e)
        {

        }

        private void serialPort1_ErrorReceived(object sender, System.IO.Ports.SerialErrorReceivedEventArgs e)
        {
            MessageBox.Show(e.ToString());
        }
    }
}
