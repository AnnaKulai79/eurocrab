package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.eurocrab.domain.OrdersDTO;
import ua.eurocrab.entity.OrdersEntity;
import ua.eurocrab.repository.OrdersRepository;
import ua.eurocrab.service.OrdersService;
import ua.eurocrab.utils.ObjectMapperUtils;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class OrdersServiceImpl implements OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @Override
    public List<OrdersDTO> getAllOrder() {
        List<OrdersEntity> ordersEntities = ordersRepository.findAll();
        List<OrdersDTO> ordersDTOs = modelMapper.mapAll(ordersEntities,OrdersDTO.class);
        return ordersDTOs;
    }

    @Override
    public OrdersDTO saveOrder(OrdersDTO order) {
        OrdersDTO ordersDTO = modelMapper.map(ordersRepository.save(modelMapper.map(order, OrdersEntity.class)), OrdersDTO.class);
        return ordersDTO;
    }

    @Override
    public List<OrdersDTO> getAllOrderBySort(String statusSort) {
        List<OrdersEntity> ordersEntities = null;
        switch (statusSort) {
            case "allOrders": ordersEntities = ordersRepository.findAll();
            break;
            case "confirmed": ordersEntities = ordersRepository.findAllConfirmed();
            break;
            case "noConfirmed": ordersEntities = ordersRepository.findAllNoConfirmed();
            break;
        }
        List<OrdersDTO> ordersDTOs = modelMapper.mapAll(ordersEntities,OrdersDTO.class);
        return ordersDTOs;
    }

    @Override
    public OrdersDTO getOrderById(Long id) {
        OrdersEntity order = ordersRepository.findById(id).get();
        return modelMapper.map(order, OrdersDTO.class);
    }

    @Override
    public OrdersDTO confimedOrder(Long id) {
        OrdersEntity order = ordersRepository.findById(id).get();
        order.setConfirmed(true);
        return modelMapper.map(ordersRepository.save(order), OrdersDTO.class);
    }

    @Override
    @Transactional
    public void deleteOrder(Long id) {
        ordersRepository.deleteById(id);
    }

}
