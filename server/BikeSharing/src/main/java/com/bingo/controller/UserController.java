package com.bingo.controller;

import com.bingo.model.User;
import com.bingo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = {"/user"})
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    /**
     * 发送验证码信息
     * @param countryCode
     * @param phoneNum
     * @return
     */
    @GetMapping(value = {"/genCode"})
    public boolean genVerifyCode(String countryCode, String phoneNum) {
        return userService.sendMsg(countryCode, phoneNum);
    }

    /**
     * 验证码验证
     * @param phoneNum
     * @param verifyCode
     * @return
     */
    @PostMapping(value = {"/verify"})
    public boolean verify(String phoneNum, String verifyCode) {
        return userService.verify(phoneNum, verifyCode);
    }

    /**
     * 用户注册
     * @param user
     * @return
     */
    @PostMapping(value = {"/register"})
    public boolean register(User user) {
        // 调用useService保存用户信息
        try {
            userService.register(user);
            return true;
        } catch (Exception e) {
            logger.error("注册失败: " + e.getMessage());
        }
        return false;
    }

    /**
     * 用户交押金
     * @param user
     * @return
     */
    @PostMapping(value = {"/deposit"})
    public boolean deposit(@RequestBody User user) {
        try {
            // 更新用户信息
            userService.update(user);
            return true;
        } catch (Exception e) {
            logger.error("更新信息失败: " + e.getMessage());
        }
        return false;
    }

    /**
     * 用户身份认证
     * @param user
     * @return
     */
    @PostMapping(value = {"/identify"})
    public boolean identify(@RequestBody User user) {
        try {
            userService.update(user);
            return true;
        } catch (Exception e) {
            logger.error("实名认证失败:" + e.getMessage());
        }
        return false;
    }
}
