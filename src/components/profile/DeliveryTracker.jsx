import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, Truck, CheckCircle, Clock, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";


const DeliveryStatusIcon = ({ status }) => {
  if (status === 'delivered') return <CheckCircle className="h-5 w-5 text-green-500" />;
  if (status === 'shipped') return <Truck className="h-5 w-5 text-blue-500" />;
  return <Clock className="h-5 w-5 text-yellow-500" />; // processing
};

const DeliveryStatusBadge = ({ status }) => {
  let variant = "secondary";
  let text = "Processando";
  if (status === 'shipped') {
    variant = "default"; 
    text = "Enviado";
  } else if (status === 'delivered') {
    variant = "success"; 
    text = "Entregue";
  }
  return <Badge variant={variant} className="capitalize">{text}</Badge>;
};


const DeliveryTracker = () => {
  const { user } = useUser();
  const deliveries = user?.deliveries || [];

  if (deliveries.length === 0) {
    return (
      <motion.div 
        className="text-center py-10 bg-card p-6 rounded-lg border shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Nenhuma entrega em andamento</h3>
        <p className="text-muted-foreground">
          Quando você resgatar uma recompensa física, o rastreio aparecerá aqui.
        </p>
      </motion.div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-1">Rastreamento de Entregas</h2>
        <p className="text-muted-foreground">Acompanhe o status dos seus prêmios físicos.</p>
      </motion.div>
      {deliveries.map((delivery, index) => (
        <motion.div
          key={delivery.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-muted/50 p-4 sm:p-6 border-b">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                        <DeliveryStatusIcon status={delivery.status} />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{delivery.rewardName}</CardTitle>
                </div>
                <DeliveryStatusBadge status={delivery.status} />
              </div>
              <CardDescription className="mt-1 text-xs sm:text-sm">Pedido em: {formatDate(delivery.purchaseDate)}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-1 text-muted-foreground flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-primary" />
                  Status da Entrega
                </h4>
                <p className="capitalize">{delivery.status === 'processing' ? 'Processando Pedido' : delivery.status === 'shipped' ? 'Pedido Enviado' : 'Pedido Entregue'}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1 text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Estimativa de Entrega
                </h4>
                <p>{formatDate(delivery.estimatedDelivery)}</p>
              </div>
              {delivery.trackingCode && (
                 <div>
                    <h4 className="font-medium text-sm mb-1 text-muted-foreground flex items-center">
                      <Package className="h-4 w-4 mr-2 text-primary" />
                      Código de Rastreio
                    </h4>
                    <p className="font-mono text-primary">{delivery.trackingCode}</p>
                  </div>
              )}
              {user?.address && (
                <div className="md:col-span-2">
                    <h4 className="font-medium text-sm mb-1 text-muted-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      Endereço de Envio
                    </h4>
                    <p className="text-sm">
                        {user.address.street}, {user.address.number} {user.address.complement ? `- ${user.address.complement}` : ''}<br />
                        {user.address.neighborhood}, {user.address.city} - {user.address.state}<br />
                        CEP: {user.address.zipCode}
                    </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DeliveryTracker;