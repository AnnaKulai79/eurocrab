package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.OrdersDTO;
import ua.eurocrab.domain.ProductsDTO;
import ua.eurocrab.service.OrdersService;
import ua.eurocrab.service.ProductsService;

import java.util.List;

@RestController
@RequestMapping("orders")
public class OrdersController {
    @Autowired
    private OrdersService ordersService;

    @Autowired
    private ProductsService productsService;

    @GetMapping
    public ResponseEntity<?> getOrders(){
        List<OrdersDTO> ordersDTOs = ordersService.getAllOrder();
        return new ResponseEntity<>(ordersDTOs,HttpStatus.OK);
    }

    @GetMapping("/sort/{statusSort}")
    public ResponseEntity<?> getOrders(@PathVariable("statusSort") String statusSort){
        List<OrdersDTO> ordersDTOs = ordersService.getAllOrderBySort(statusSort);
        return new ResponseEntity<>(ordersDTOs,HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getOrderById(@PathVariable("id") Long id){
        OrdersDTO order = ordersService.getOrderById(id);
        return new ResponseEntity<>(order,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveOrder(@RequestBody OrdersDTO order) {
        OrdersDTO ordersDTO = ordersService.saveOrder(order);
        return new ResponseEntity<>(ordersDTO, HttpStatus.OK);
    }

    @PutMapping("/confirmed/{id}")
    public ResponseEntity<?> confirmedOrder(@PathVariable("id") Long id) {
        OrdersDTO ordersDTO = ordersService.confimedOrder(id);
        return new ResponseEntity<>(ordersDTO, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable("id") Long id) {
        ordersService.deleteOrder(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
