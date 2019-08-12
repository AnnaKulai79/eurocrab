package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.BuyProductsDTO;
import ua.eurocrab.service.BuyProductsService;

import java.util.List;

@RestController("buy_products")
@RequestMapping("buy_products")
public class BuyProductsController {
    @Autowired
    private BuyProductsService buyProductsService;

    @GetMapping
    public ResponseEntity<?> findAll(){
        List<BuyProductsDTO> buyProductsDTO = buyProductsService.findAll();
        return new ResponseEntity<>(buyProductsDTO,HttpStatus.OK);
    }

    @GetMapping("/order/{id}")
    public ResponseEntity<?> findAllByOrderId(@PathVariable("id") Long id){
        List<BuyProductsDTO> buyProductsDTO = buyProductsService.findAllByOrderId(id);
        return new ResponseEntity<>(buyProductsDTO,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveBuyProduct(@RequestBody BuyProductsDTO buyProduct) {
        BuyProductsDTO buyProductsDTO = buyProductsService.saveBuyProduct(buyProduct);
        return new ResponseEntity<>(buyProductsDTO, HttpStatus.OK);
    }


}
