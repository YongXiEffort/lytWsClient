package com.lyt.wsclient;

import com.lyt.wsclient.dao.UserMapper;
import com.lyt.wsclient.domain.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WsclientApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    @Rollback
    public void test() throws Exception {
        userMapper.insert("AAA", "lyt", "123456");
        User u = userMapper.findByName("lyt");
        Assert.assertEquals("123456", u.getPassword());
    }

}
