
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, CreditCard, Calendar, DollarSign, FileText, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([
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

  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [newPayment, setNewPayment] = useState({
    studentName: "",
    courseName: "",
    amount: "",
    status: "pending" as Payment['status']
  });

  const generateInvoiceNumber = () => {
    const nextNumber = payments.length + 1;
    return `INV-2024-${String(nextNumber).padStart(3, '0')}`;
  };

  const handleAddPayment = () => {
    if (!newPayment.studentName || !newPayment.courseName || !newPayment.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const payment: Payment = {
      id: String(payments.length + 1),
      studentName: newPayment.studentName,
      courseName: newPayment.courseName,
      amount: parseFloat(newPayment.amount),
      status: newPayment.status,
      date: new Date().toISOString().split('T')[0],
      invoiceNumber: generateInvoiceNumber()
    };

    setPayments([...payments, payment]);
    setNewPayment({
      studentName: "",
      courseName: "",
      amount: "",
      status: "pending"
    });
    setIsAddingPayment(false);
    
    toast({
      title: "Success",
      description: "Payment added successfully"
    });
  };

  const handleEditPayment = (payment: Payment) => {
    setEditingPayment(payment);
    setNewPayment({
      studentName: payment.studentName,
      courseName: payment.courseName,
      amount: payment.amount.toString(),
      status: payment.status
    });
  };

  const handleUpdatePayment = () => {
    if (!editingPayment) return;

    const updatedPayments = payments.map(payment => 
      payment.id === editingPayment.id 
        ? {
            ...payment,
            studentName: newPayment.studentName,
            courseName: newPayment.courseName,
            amount: parseFloat(newPayment.amount),
            status: newPayment.status
          }
        : payment
    );

    setPayments(updatedPayments);
    setEditingPayment(null);
    setNewPayment({
      studentName: "",
      courseName: "",
      amount: "",
      status: "pending"
    });

    toast({
      title: "Success",
      description: "Payment updated successfully"
    });
  };

  const handleDeletePayment = (paymentId: string) => {
    setPayments(payments.filter(payment => payment.id !== paymentId));
    toast({
      title: "Success",
      description: "Payment deleted successfully"
    });
  };

  const downloadInvoice = (payment: Payment) => {
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

      {/* Add Payment Form */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Plus className="h-6 w-6 text-blue-600" />
            Add New Payment
          </CardTitle>
          <CardDescription>
            Create a new payment record manually
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                placeholder="Enter student name"
                value={newPayment.studentName}
                onChange={(e) => setNewPayment({...newPayment, studentName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                placeholder="Enter course name"
                value={newPayment.courseName}
                onChange={(e) => setNewPayment({...newPayment, courseName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPayment.status}
                onChange={(e) => setNewPayment({...newPayment, status: e.target.value as Payment['status']})}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={handleAddPayment} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment
            </Button>
          </div>
        </CardContent>
      </Card>

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
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadInvoice(payment)}
                          className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Download className="h-4 w-4" />
                          Invoice
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditPayment(payment)}
                              className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300"
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Payment</DialogTitle>
                              <DialogDescription>
                                Update payment information
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="editStudentName">Student Name</Label>
                                <Input
                                  id="editStudentName"
                                  value={newPayment.studentName}
                                  onChange={(e) => setNewPayment({...newPayment, studentName: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editCourseName">Course Name</Label>
                                <Input
                                  id="editCourseName"
                                  value={newPayment.courseName}
                                  onChange={(e) => setNewPayment({...newPayment, courseName: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editAmount">Amount</Label>
                                <Input
                                  id="editAmount"
                                  type="number"
                                  value={newPayment.amount}
                                  onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editStatus">Status</Label>
                                <select
                                  id="editStatus"
                                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  value={newPayment.status}
                                  onChange={(e) => setNewPayment({...newPayment, status: e.target.value as Payment['status']})}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="completed">Completed</option>
                                  <option value="failed">Failed</option>
                                </select>
                              </div>
                              <Button onClick={handleUpdatePayment} className="w-full">
                                Update Payment
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePayment(payment.id)}
                          className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
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
