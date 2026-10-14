package com.example.agriculturesupplychain.config;

import org.hibernate.dialect.DatabaseVersion;
import org.hibernate.dialect.OracleDialect;
import org.hibernate.dialect.pagination.LimitHandler;
import org.hibernate.dialect.pagination.NoopLimitHandler;
import org.hibernate.engine.jdbc.dialect.spi.DialectResolutionInfo;
import org.hibernate.query.common.FetchClauseType;

/**
 * Custom Oracle dialect for Oracle 11g compatibility with Hibernate 7.
 * Oracle 11g XE does not support ANSI SQL 'FETCH FIRST n ROWS ONLY'.
 * Overriding supportsFetchClause to return false prevents Hibernate 7 SQM
 * from generating FETCH FIRST clauses, and NoopLimitHandler delegates
 * row limiting to JDBC PreparedStatement.setMaxRows().
 */
public class Oracle11gDialect extends OracleDialect {

    public Oracle11gDialect() {
        super();
    }

    public Oracle11gDialect(DatabaseVersion version) {
        super(version);
    }

    public Oracle11gDialect(DialectResolutionInfo info) {
        super(info);
    }

    @Override
    public boolean supportsFetchClause(FetchClauseType type) {
        return false;
    }

    @Override
    public LimitHandler getLimitHandler() {
        return NoopLimitHandler.INSTANCE;
    }
}
