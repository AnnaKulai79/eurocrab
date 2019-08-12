package ua.eurocrab.service;

import ua.eurocrab.domain.CartDTO;

import java.util.List;

public interface CartService {
    CartDTO addToCart(Long idTovar, String ipUser);

    List<CartDTO> findAllCarts();

    List<CartDTO> findAllCartsByUser(String ipUser);

    CartDTO changeCart(Long idCart, int count);

    void deleteCart(Long id);

    void clearBasket(String ipUser);
}
