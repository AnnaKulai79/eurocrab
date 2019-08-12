package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.eurocrab.domain.CartDTO;
import ua.eurocrab.entity.CartEntity;
import ua.eurocrab.entity.ProductsEntity;
import ua.eurocrab.repository.CartRepository;
import ua.eurocrab.repository.ProductsRepository;
import ua.eurocrab.service.CartService;
import ua.eurocrab.utils.ObjectMapperUtils;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @Override
    public CartDTO addToCart(Long idTovar, String ipUser) {
        Long countCartsByIdAndUser = cartRepository.countByIdAndUser(idTovar, ipUser);
        CartDTO cartDTO = new CartDTO();
        if(countCartsByIdAndUser > 0) {
            CartEntity carts = cartRepository.findAllByIdAndUser(idTovar, ipUser);
            carts.setCount(carts.getCount() + 1);
            cartDTO = modelMapper.map(cartRepository.save(carts), CartDTO.class);
        }else {
            ProductsEntity product = productsRepository.findById(idTovar).get();
            CartEntity newCart = new CartEntity();
            newCart.setProducts(product);
            newCart.setCount(1);
            newCart.setIp(ipUser);
            newCart.setPrice(product.getPrice());
            newCart.setDatetime(new Date());
            cartDTO = modelMapper.map(cartRepository.save(newCart), CartDTO.class);
        }
        return cartDTO;
    }

    @Override
    public List<CartDTO> findAllCarts() {
        List<CartEntity> carts = cartRepository.findAll();
        List<CartDTO> cartDTOs = modelMapper.mapAll(carts,CartDTO.class);
        return  cartDTOs;
    }

    @Override
    public List<CartDTO> findAllCartsByUser(String ipUser) {
        String ip = "\"" + ipUser + "\"";
        Set<Character> res = new HashSet();
        res.contains()
        List<CartEntity> carts = cartRepository.findAllByUser(ip);
        List<CartDTO> cartDTOs = modelMapper.mapAll(carts,CartDTO.class);
        System.out.println(carts.size() + " is size and IP is " + ip);
        return  cartDTOs;
    }

    @Override
    public CartDTO changeCart(Long idCart, int count) {
        CartEntity cartEntity = cartRepository.findById(idCart).get();
        cartEntity.setCount(count);
        CartDTO cartDTO = modelMapper.map(cartRepository.save(cartEntity), CartDTO.class);
        return cartDTO;
    }

    @Override
    @Transactional
    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void clearBasket(String ipUser) {
        List<CartEntity> cartEntity = cartRepository.findAllByUser(ipUser);
        Iterator<CartEntity> iteratorCart = cartEntity.iterator();
        while (iteratorCart.hasNext() ) {
            CartEntity nextCart = iteratorCart.next();
            cartRepository.deleteById(nextCart.getId());
        }

    }
}
