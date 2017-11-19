sql snippet 1
           EXEC SQL DECLARE IKPKEYAAID TABLE                                    
           ( IKPKA_BANCA                    CHAR(2) NOT NULL,                   
             IKPKA_KEYA                     CHAR(16) NOT NULL,                  
             IKPKA_AID                      DECIMAL(8, 0) NOT NULL,             
             IKPKA_STATO                    CHAR(1) NOT NULL,                   
             IKPKA_DATA_INS                 DATE NOT NULL,                      
             IKPKA_MATR_INS                 CHAR(8) NOT NULL,                   
             IKPKA_DATA_VAR                 DATE NOT NULL,                      
             IKPKA_MATR_VAR                 CHAR(8) NOT NULL,                   
             IKPKA_DATA_REV                 DATE NOT NULL,                      
             IKPKA_MATR_REV                 CHAR(8) NOT NULL                    
           ) END-EXEC.                                                          


