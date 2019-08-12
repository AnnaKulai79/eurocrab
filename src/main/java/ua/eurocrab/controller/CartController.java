package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.CartDTO;
import ua.eurocrab.service.CartService;

import java.util.List;

@RestController
@RequestMapping("cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping(value = "/allproduct/{ip}")
    public ResponseEntity<?> findAllCartProducts(@PathVariable("ip") String ipUser) {
        List<CartDTO> cartDTOs = cartService.findAllCartsByUser(ipUser);
        if (cartDTOs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cartDTOs, HttpStatus.OK);
    }

    @PostMapping(value = "{id}")
    public ResponseEntity<?> addToCart(@PathVariable("id") Long idTovar, @RequestBody String ipUser) {
        System.out.println("tovar = " + idTovar + ", user = " + ipUser);
        CartDTO cart = cartService.addToCart(idTovar,ipUser);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PutMapping(value = "{id}")
    public ResponseEntity<?> changeCart(@PathVariable("id") Long idCart, @RequestBody int count) {
        CartDTO cart = cartService.changeCart(idCart, count);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteCart(@PathVariable("id") Long id) {
        cartService.deleteCart(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/clear/{ip}")
    public boolean clearBasket(@PathVariable("ip") String ipUser) {
        cartService.clearBasket(ipUser);
        return true;
    }


}
