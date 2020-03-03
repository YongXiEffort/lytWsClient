package com.lyt.wsclient.dao;

import com.lyt.wsclient.domain.ChatSingle;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;

import java.util.List;

@Mapper
public interface ChatSingleMapper {

    /**
     * 获取当前用户和某人的聊天内容
     * @return
     */
    @Select("SELECT cs.id, cs.from_user_id, cs.recept_user_id, cs.send_time, cs.content, cs.if_recept " +
            " FROM chat_single cs " +
            " WHERE ((cs.from_user_id = #{currentUserId} AND cs.recept_user_id = #{firUserId}) OR " +
            " (cs.from_user_id = #{firUserId} AND cs.recept_user_id = #{currentUserId})) " +
            " ORDER BY cs.send_time ")
    @Results({
            @Result(column="id", property="id", jdbcType= JdbcType.VARCHAR, id=true),
            @Result(column="from_user_id", property="fromUserId", jdbcType=JdbcType.VARCHAR),
            @Result(column="recept_user_id", property="receptUserId", jdbcType=JdbcType.VARCHAR),
            @Result(column="send_time", property="sendTime", jdbcType=JdbcType.DATE),
            @Result(column="content", property="content", jdbcType=JdbcType.VARCHAR),
            @Result(column="if_recept", property="ifRecept", jdbcType=JdbcType.VARCHAR),
    })
    List<ChatSingle> findChatMsgByReceptUser(@Param("currentUserId") String currentUserId, @Param("firUserId") String firUserId);

}
