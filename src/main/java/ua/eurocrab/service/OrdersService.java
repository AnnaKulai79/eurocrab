package ua.eurocrab.service;

import ua.eurocrab.domain.OrdersDTO;

import java.util.List;

public interface OrdersService {

    List<OrdersDTO> getAllOrder();

    OrdersDTO saveOrder(OrdersDTO order);

    List<OrdersDTO> getAllOrderBySort(String statusSort);

    OrdersDTO getOrderById(Long id);

    OrdersDTO confimedOrder(Long id);

    void deleteOrder(Long id);
}
