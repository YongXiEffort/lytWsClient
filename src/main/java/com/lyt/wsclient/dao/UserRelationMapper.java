package com.lyt.wsclient.dao;

import com.lyt.wsclient.model.chat.FriUserListModel;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;

import java.util.List;

@Mapper
public interface UserRelationMapper {

    /**
     * 获取某个用户的好友列表
     * @return
     */
    @Select("SELECT u.id, u.user_name, cs.content " +
            " FROM user u, user_relation ur, chat_single cs " +
            " WHERE u.id = ur.fri_user_id " +
            " AND ur.last_chat_id = cs.id " +
            " AND ur.user_id = #{userId} " +
            " ORDER BY u.user_name ")
    @Results({
            @Result(column="id", property="friUserId", jdbcType= JdbcType.VARCHAR, id=true),
            @Result(column="user_name", property="friUserName", jdbcType=JdbcType.VARCHAR),
            @Result(column="content", property="content", jdbcType=JdbcType.VARCHAR),
    })
    List<FriUserListModel> findFirUserAroundUserOrderByUserName(@Param("userId") String userId);

}
