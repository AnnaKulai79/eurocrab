package ua.eurocrab.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "admin")
public class AdminEntity extends BaseEntity {
    @Column(nullable = false)
    private String login;

    @Column(nullable = false)
    private String pass;

    @Column(nullable = false)
    private String fio;

    @Column(nullable = false)
    private Role role;

    @Column(nullable = false,length = 50)
    private String email;

    @Column(nullable = false,length = 50)
    private String phone;

    @Column(nullable = false, name = "view_orders")
    private boolean viewOrders = false;

    @Column(nullable = false, name = "accept_orders")
    private boolean acceptOrders = false;

    @Column(nullable = false, name = "delete_orders")
    private boolean deleteOrders = false;

    @Column(nullable = false, name = "add_tovar")
    private boolean addTovar = false;

    @Column(nullable = false, name = "edit_tovar")
    private boolean editTovar = false;

    @Column(nullable = false, name = "delete_tovar")
    private boolean deleteTovar = false;

    @Column(nullable = false, name = "accept_reviews")
    private boolean acceptReviews = false;

    @Column(nullable = false, name = "delete_reviews")
    private boolean deleteReviews = false;

    @Column(nullable = false, name = "view_clients")
    private boolean viewClients = false;

    @Column(nullable = false, name = "delete_clients")
    private boolean deleteClients = false;

    @Column(nullable = false, name = "add_news")
    private boolean addNews = false;

    @Column(nullable = false, name = "delete_news")
    private boolean deleteNews = false;

    @Column(nullable = false, name = "add_category")
    private boolean addCategory = false;

    @Column(nullable = false, name = "delete_category")
    private boolean deleteCategory = false;

    @Column(nullable = false, name = "view_Admin")
    private boolean viewAdmin = false;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getFio() {
        return fio;
    }

    public void setFio(String fio) {
        this.fio = fio;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean isViewOrders() {
        return viewOrders;
    }

    public void setViewOrders(boolean viewOrders) {
        this.viewOrders = viewOrders;
    }

    public boolean isAcceptOrders() {
        return acceptOrders;
    }

    public void setAcceptOrders(boolean acceptOrders) {
        this.acceptOrders = acceptOrders;
    }

    public boolean isDeleteOrders() {
        return deleteOrders;
    }

    public void setDeleteOrders(boolean deleteOrders) {
        this.deleteOrders = deleteOrders;
    }

    public boolean isAddTovar() {
        return addTovar;
    }

    public void setAddTovar(boolean addTovar) {
        this.addTovar = addTovar;
    }

    public boolean isEditTovar() {
        return editTovar;
    }

    public void setEditTovar(boolean editTovar) {
        this.editTovar = editTovar;
    }

    public boolean isDeleteTovar() {
        return deleteTovar;
    }

    public void setDeleteTovar(boolean deleteTovar) {
        this.deleteTovar = deleteTovar;
    }

    public boolean isAcceptReviews() {
        return acceptReviews;
    }

    public void setAcceptReviews(boolean acceptReviews) {
        this.acceptReviews = acceptReviews;
    }

    public boolean isDeleteReviews() {
        return deleteReviews;
    }

    public void setDeleteReviews(boolean deleteReviews) {
        this.deleteReviews = deleteReviews;
    }

    public boolean isViewClients() {
        return viewClients;
    }

    public void setViewClients(boolean viewClients) {
        this.viewClients = viewClients;
    }

    public boolean isDeleteClients() {
        return deleteClients;
    }

    public void setDeleteClients(boolean deleteClients) {
        this.deleteClients = deleteClients;
    }

    public boolean isAddNews() {
        return addNews;
    }

    public void setAddNews(boolean addNews) {
        this.addNews = addNews;
    }

    public boolean isDeleteNews() {
        return deleteNews;
    }

    public void setDeleteNews(boolean deleteNews) {
        this.deleteNews = deleteNews;
    }

    public boolean isAddCategory() {
        return addCategory;
    }

    public void setAddCategory(boolean addCategory) {
        this.addCategory = addCategory;
    }

    public boolean isDeleteCategory() {
        return deleteCategory;
    }

    public void setDeleteCategory(boolean deleteCategory) {
        this.deleteCategory = deleteCategory;
    }

    public boolean isViewAdmin() {
        return viewAdmin;
    }

    public void setViewAdmin(boolean viewAdmin) {
        this.viewAdmin = viewAdmin;
    }
}
