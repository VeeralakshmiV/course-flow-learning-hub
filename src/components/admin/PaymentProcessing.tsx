
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, CreditCard, Calendar, DollarSign, FileText } from "lucide-react";

interface Payment {
  id: string;
  studentName: string;
  courseName: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  invoiceNumber: string;
}

const PaymentProcessing = () => {
  const [payments] = useState<Payment[]>([
    {
      id: "1",
      studentName: "John Doe",
      courseName: "Web Development Mastery",
      amount: 299.99,
      status: "completed",
      date: "2024-01-15",
      invoiceNumber: "INV-2024-001"
    },
    {
      id: "2",
      studentName: "Jane Smith",
      courseName: "Data Science Excellence",
      amount: 399.99,
      status: "completed",
      date: "2024-01-14",
      invoiceNumber: "INV-2024-002"
    },
    {
      id: "3",
      studentName: "Mike Johnson",
      courseName: "Programming Fundamentals",
      amount: 199.99,
      status: "pending",
      date: "2024-01-13",
      invoiceNumber: "INV-2024-003"
    },
    {
      id: "4",
      studentName: "Sarah Wilson",
      courseName: "Advanced JavaScript",
      amount: 249.99,
      status: "failed",
      date: "2024-01-12",
      invoiceNumber: "INV-2024-004"
    }
  ]);

  const downloadInvoice = (payment: Payment) => {
    // Generate and download invoice
    const invoiceContent = `
INVOICE

Invoice Number: ${payment.invoiceNumber}
Date: ${payment.date}
Student: ${payment.studentName}
Course: ${payment.courseName}
Amount: $${payment.amount}
Status: ${payment.status.toUpperCase()}

Thank you for your business!
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${payment.invoiceNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getStatusBadge = (status: Payment['status']) => {
    const variants = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      failed: "bg-red-100 text-red-800 border-red-200"
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-gray-900">{failedPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-600" />
            Payment Transactions
          </CardTitle>
          <CardDescription>
            View and manage all payment transactions with invoice download functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                    <TableCell>{payment.studentName}</TableCell>
                    <TableCell>{payment.courseName}</TableCell>
                    <TableCell className="font-semibold">${payment.amount}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadInvoice(payment)}
                        className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                      >
                        <Download className="h-4 w-4" />
                        Invoice
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentProcessing;
