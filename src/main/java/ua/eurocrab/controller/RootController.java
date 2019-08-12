package ua.eurocrab.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RootController {
    @GetMapping("/")
    public String returnMainPage(){
        return "index";
    }

    @GetMapping("/404")
    public String returnHomePage(){
        return "404";
    }

    @GetMapping("/pronas")
    public String returnPronasPage(){
        return "pronas";
    }

    @GetMapping("/kontakty")
    public String returnKontaktyPage(){
        return "kontakty";
    }

    @GetMapping("/zakaz")
    public String returnZakazPage(){
        return "zakaz";
    }

    @GetMapping("/oplata")
    public String returnOplataPage(){
        return "oplata";
    }

    @GetMapping("/vozvrat")
    public String returnVozvratPage(){
        return "vozvrat";
    }

    @GetMapping("/oferta")
    public String returnOfertaPage(){
        return "oferta";
    }

    @GetMapping("/vakansii")
    public String returnVakansiiPage(){
        return "vakansii";
    }

    @GetMapping("/partneram")
    public String returnPartneramPage(){
        return "partneram";
    }

    @GetMapping("/feedback")
    public String returnFeedbackPage(){
        return "feedback";
    }

    @GetMapping("/login")
    public String returnLoginPage(){
        return "a_login";
    }

    @GetMapping("/view_content")
    public String returnViewContentPage(){
        return "view_content";
    }

    @GetMapping("/view_cat")
    public String returnViewCatPage(){
        return "view_cat";
    }

    @GetMapping("/view_aystopper")
    public String returnViewAystopperPage(){
        return "view_aystopper";
    }

    @GetMapping("/search_filter")
    public String returnSearchFilterPage(){
        return "search_filter";
    }

    @GetMapping("/search")
    public String returnSearchPage(){
        return "search";
    }

    @GetMapping("/profile")
    public String returnProfilePage(){
        return "profile";
    }

    @GetMapping("/cart")
    public String returnCartPage(){
        return "cart";
    }

    @GetMapping("/registration")
    public String returnRegistrationPage(){
        return "registration";
    }

    @GetMapping("/admin/index")
    public String returnAdminPage(){
        return "a_index";
    }

    @GetMapping("/admin/tovar")
    public String returnTovarPage(){
        return "a_tovar";
    }

    @GetMapping("/admin/add_product")
    public String returnAddProductPage(){
        return "a_add_product";
    }

    @GetMapping("/admin/admin")
    public String returnAminPage(){
        return "a_admin";
    }

    @GetMapping("/admin/add_admin")
    public String returnAddAdminPage(){
        return "a_add_admin";
    }

    @GetMapping("/admin/categories")
    public String returnCategoryPage(){
        return "a_category";
    }

    @GetMapping("/admin/reviews")
    public String returnReviewsPage(){
        return "a_reviews";
    }

    @GetMapping("/admin/feedback")
    public String returnAFeedbackPage(){
        return "a_feedback";
    }

    @GetMapping("/admin/ipadd")
    public String returnIpaddPage(){
        return "a_ipadd";
    }

    @GetMapping("/admin/clients")
    public String returnClientsPage(){
        return "a_clients";
    }

    @GetMapping("/admin/orders")
    public String returnOrdersPage(){
        return "a_orders";
    }

    @GetMapping("/admin/view_order")
    public String returnViewOrderPage(){
        return "a_view_order";
    }

    @GetMapping("/admin/news")
    public String returnNewsPage(){
        return "a_news";
    }

    @GetMapping("/admin/edit_product")
    public String returnEditProductPage(){
        return "a_edit_product";
    }

    @GetMapping("/admin/edit_admin")
    public String returnEditAdminPage(){
        return "a_edit_admin";
    }

}
