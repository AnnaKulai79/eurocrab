package ua.eurocrab.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.eurocrab.entity.Role;

@Getter
@Setter
@NoArgsConstructor

public class AdminDTO {
    private Long id;
    private String login;
    private String pass;
    private String fio;
    private Role role;
    private String email;
    private String phone;
    private boolean viewOrders = false;
    private boolean acceptOrders = false;
    private boolean deleteOrders = false;
    private boolean addTovar = false;
    private boolean editTovar = false;
    private boolean deleteTovar = false;
    private boolean acceptReviews = false;
    private boolean deleteReviews = false;
    private boolean viewClients = false;
    private boolean deleteClients = false;
    private boolean addNews = false;
    private boolean deleteNews = false;
    private boolean addCategory = false;
    private boolean deleteCategory = false;
    private boolean viewAdmin = false;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
