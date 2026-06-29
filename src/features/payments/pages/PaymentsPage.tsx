import { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { usePayments, useMakePayment } from '../hooks/use-payments'
import { format } from 'date-fns'

export function PaymentsPage() {
  const { data: paymentsData, isLoading, isError } = usePayments()
  const payments = paymentsData?.data ?? []
  const makePayment = useMakePayment()
  const [amount, setAmount] = useState('')
  const [open, setOpen] = useState(false)

  const totalPaid = payments.filter((p) => p.status === 'COMPLETED').reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments.filter((p) => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0)

  const handlePayment = async () => {
    const numAmount = Number(amount)
    if (isNaN(numAmount) || numAmount <= 0) return
    try {
      await makePayment.mutateAsync(numAmount)
      setAmount('')
      setOpen(false)
    } catch {
      // error handled by mutation
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading payments...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-muted-foreground">
        <CreditCard className="mb-3 h-10 w-10" />
        <p className="text-lg font-medium">Could not load payment data</p>
        <p className="text-sm">Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">Manage school fees and payment history.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Paid</p>
            <p className="mt-2 text-3xl font-semibold text-success">₦{totalPaid.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="mt-2 text-3xl font-semibold text-warning">₦{totalPending.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Payments</p>
            <p className="mt-2 text-3xl font-semibold">{payments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="mt-2 text-3xl font-semibold">
              {payments.filter((p) => p.status === 'COMPLETED').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment History
          </CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Make Payment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Make a Payment</DialogTitle>
                <DialogDescription>Enter the amount you wish to pay.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min={1}
                    placeholder="50000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handlePayment} disabled={!amount || makePayment.isPending}>
                  {makePayment.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Pay Now'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {!payments || payments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No payments yet.</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-xs">{payment.reference}</TableCell>
                      <TableCell>₦{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            payment.status === 'COMPLETED'
                              ? 'default'
                              : payment.status === 'PENDING'
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(payment.createdAt), 'MMM d, yyyy')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
