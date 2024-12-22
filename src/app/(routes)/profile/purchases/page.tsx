"use client";
import { useState, useEffect } from "react";
import { OrderService } from "@/services/order.service";
import { Order, OrderStatusType } from "@/types/order";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PurchasesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statuses, setStatuses] = useState<OrderStatusType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const pageSize = 5;

  const orderService = new OrderService();

  useEffect(() => {
    const loadStatuses = async () => {
      try {
        const response = await orderService.getOrderStatuses();
        if (response.success) {
          setStatuses(response.data || []);
        }
      } catch (error) {
        console.error("Failed to load order statuses:", error);
      }
    };

    loadStatuses();
  }, []);

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      try {
        const response = await orderService.getOrders({
          page: currentPage,
          pageSize,
          status: selectedStatus === "all" ? undefined : selectedStatus,
        });
        console.log(response);
        if (response.success) {
          setOrders(response.data || []);
        }
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [currentPage, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">My purchases</h2>

        <Select
          value={selectedStatus}
          onValueChange={(value) => {
            setSelectedStatus(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All orders</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status.id} value={status.status}>
                {status.status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription>
                      Placed on {format(new Date(order.orderDate), "PPP")}
                    </CardDescription>
                  </div>
                  <div className="space-y-1 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                    <p className="text-sm text-gray-500">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={`${order.id}-${item.productId}`}
                        className="flex gap-4"
                      >
                        <div className="w-20 h-20 relative">
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium">{item.productName}</h4>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm font-medium">
                            {item.price.toLocaleString()}đ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span>
                        {order.shippingMethod.price.toLocaleString()}đ
                      </span>
                    </div>
                    <div className="flex justify-between mt-2 font-medium">
                      <span>Total</span>
                      <span>{order.totalPrice.toLocaleString()}đ</span>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="border-t pt-4 text-sm">
                    <h4 className="font-medium mb-2">Shipping Information</h4>
                    <p>{order.shippingAddress.customer}</p>
                    <p>{order.shippingAddress.phoneNumber}</p>
                    <p>
                      {order.shippingAddress.detailedAddress},{" "}
                      {order.shippingAddress.district}
                    </p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.country}
                    </p>
                    <p className="mt-2 text-gray-500">
                      {order.shippingMethod.name} -{" "}
                      {order.shippingMethod.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="cursor-pointer"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
          </PaginationItem>
          {/* Add page numbers here if needed */}
          <PaginationItem>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="cursor-pointer"
              disabled={orders.length < pageSize}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
