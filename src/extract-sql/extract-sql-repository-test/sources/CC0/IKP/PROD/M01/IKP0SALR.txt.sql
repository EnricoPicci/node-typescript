sql snippet 1
           EXEC SQL INCLUDE SQLCA    END-EXEC.                                  


sql snippet 2
           EXEC SQL INCLUDE IKP0TAFH END-EXEC.                                  


sql snippet 3
           EXEC SQL INCLUDE IKP0TAM2 END-EXEC.                                  


sql snippet 4
           EXEC SQL INCLUDE IKP0TADC END-EXEC.                                  


sql snippet 5
           EXEC SQL INCLUDE IKP0TADR END-EXEC.                                  


sql snippet 6
           EXEC SQL INCLUDE IKP0TARP END-EXEC.                                  


sql snippet 7
           EXEC SQL INCLUDE IKP0TAAB END-EXEC.                                  


sql snippet 8
           EXEC SQL INCLUDE IKP0TAFU END-EXEC.                                  


sql snippet 9
           EXEC SQL INCLUDE IKP0TAGG END-EXEC.                                  


sql snippet 10
               EXEC SQL SELECT IKPGG_ID_IKP                                     
                     INTO :UID                                                  
                     FROM IKPGRUPPI_USER                                        
                      WHERE IKPGG_UID = :IKPGG-UID                              
                      AND   IKPGG_REB = :IKPGG-REB                              
                      AND   IKPGG_REB_TIPO = :IKPGG-REB-TIPO                    
NEYES                 AND   IKPGG_STATO �= 'Y'                                  
                      WITH UR                                                   
               END-EXEC                                                         


sql snippet 11
              EXEC SQL INSERT INTO IKPALBERO_1                                  
                                   ( SERVIZIO                                   
                                   , IDPADRE                                    
                                   , ID                                         
                                   , CODICE                                     
                                   , ORDINALE                                   
                                   , LIVELLO                                    
                                   , DESCRIZIONE                                
                                   , URL                                        
                                   , CONTENITORE                                
                                   , UTILIZZATORE                               
                                   , CONTO                                      
                                   )                                            
                            VALUES (:TT-SERVIZIO                                
                                  , :TT-IDPADRE                                 
                                  , :TT-ID                                      
                                  , :TT-CODICE                                  
                                  , :TT-ORDINALE                                
                                  , :TT-LIVELLO                                 
                                  , :TT-DESCRIZIONE                             
                                  , :TT-URL                                     
                                  , :TT-CONTENITORE                             
                                  , :TT-UTILIZZATORE                            
                                  , :TT-CONTO                                   
                                   )                                            
              END-EXEC                                                          


sql snippet 12
              EXEC SQL                                                          
                  sELECT IKPDR_VALORE                                           
                   INTO :IKPDR-VALORE                                           
                   FROM  IKPDATIREB                                             
                   WHERE IKPDR_BANCA IN (' ',:IKPDR-BANCA)                      
                   AND   IKPDR_REB         = :IKPDR-REB                         
                   AND   IKPDR_REB_TIPO    = :IKPDR-REB-TIPO                    
                   AND   IKPDR_DATO        = 'PROFILO'                          
                   ORDER BY IKPDR_BANCA DESC                                    
                   FETCH FIRST 1 ROW ONLY                                       
                   WITH  UR                                                     
              END-EXEC                                                          


sql snippet 13
GM124J        EXEC SQL                                                          
GM124J            SELECT IKPDR_VALORE                                           
GM124J             INTO :IKPDR-VALORE                                           
GM124J             FROM  IKPDATIREB                                             
GM124J             WHERE IKPDR_BANCA IN (' ',:IKPDR-BANCA)                      
GM124J             AND   IKPDR_REB         = :IKPDR-REB                         
GM124J             AND   IKPDR_REB_TIPO    = :IKPDR-REB-TIPO                    
GM124J             AND   IKPDR_DATO        = 'PROFILO'                          
GM124J             WITH  UR                                                     
GM124J        END-EXEC                                                          


sql snippet 14
           EXEC SQL                                                             
               SELECT IKPM2_ABIL                                                
                   ,  IKPM2_ABIL1                                               
                   ,  IKPM2_ABIL2                                               
                INTO :IKPM2-ABIL                                                
                   , :IKPM2-ABIL1                                               
                   , :IKPM2-ABIL2                                               
                FROM  IKPMAGGIO_X_REB                                           
                WHERE IKPM2_UID     = :IKPM2-UID                                
                  AND IKPM2_REB     = :IKPM2-REB                                
                WITH  UR                                                        
           END-EXEC                                                             


sql snippet 15
           EXEC SQL                                                             
                SELECT IKPFH_ABIL                                               
                    ,  IKPFH_ABIL1                                              
                    ,  IKPFH_ABIL2                                              
                 INTO :IKPFH-ABIL                                               
                    , :IKPFH-ABIL1                                              
                    , :IKPFH-ABIL2                                              
                 FROM  IKPFUNZIONICANALI                                        
                WHERE  IKPFH_BANCA     = :IKPFH-BANCA                           
                  AND  IKPFH_FT        = :IKPFH-FT                              
                  AND  IKPFH_CANALE    = :IKPFH-CANALE                          
                  AND  IKPFH_SICUREZZA = :IKPFH-SICUREZZA                       
                  AND  IKPFH_PROFILO  IN (' ',:IKPFH-PROFILO)                   
                ORDER  BY IKPFH_PROFILO DESC                                    
                FETCH  FIRST 1 ROW ONLY                                         
           END-EXEC                                                             


sql snippet 16
           EXEC SQL                                                             
                DECLARE CURKEYA CURSOR FOR                                      
                 SELECT DISTINCT                                                
                        IKPFU_SERVIZIO                                          
                      , IKPFU_PRG_CODICE                                        
                      , IKPFU_CODICE                                            
                      , IKPFU_ORDINALE                                          
                      , IKPFU_LIVELLO                                           
                      , IKPFU_PRG_PADRE                                         
                      , IKPFU_URL                                               
                      , IKPFU_CONTENITORE                                       
                      , IKPFU_FT                                                
                      , IKPFU_DESCRIZIONE                                       
                      , IKPFU_HELP                                              
GM124J                , IKPFU_ALIAS                                             
                   FROM IKPABILITAZIONI                                         
                      , IKPFUNZIONI                                             
                      , IKPRAPPORTI                                             
                  WHERE IKPFU_BANCA  IN (' ',IKPAB_BANCA)                       
                    AND IKPAB_REB     = :IKPAB-REB                              
                    AND IKPAB_UID     = :IKPAB-UID                              
                    AND IKPFU_FT      = :IKPFU-FT                               
                    AND IKPRP_KEYR    =  IKPAB_KEYR                             
                    AND IKPRP_KEYA    = :IKPRP-KEYA                             
GM148D*             AND SUBSTR(CONCAT(IKPAB_ABIL,IKPAB_ABIL1),                  
GM148D              AND SUBSTR(IKPAB_ABIL �� IKPAB_ABIL1 �� IKPAB_ABIL2,        
                               INTEGER(IKPFU_PRG_CODICE),1) <> '0'              
                    AND IKPFU_STATO  <> 'R'                                     
                    AND IKPFU_STATO  <> 'N'                                     
                    AND IKPFU_STATO  <> 'D'                                     
NEYES               AND IKPAB_PROG   IN (1,2)                                   
                   WITH UR                                                      
                    FOR FETCH ONLY                                              
           END-EXEC                                                             


sql snippet 17
           EXEC SQL OPEN CURKEYA  END-EXEC                                      


sql snippet 18
           EXEC SQL                                                             
                DECLARE CURVALI CURSOR FOR                                      
                 SELECT IKPFU_SERVIZIO                                          
                      , IKPFU_PRG_CODICE                                        
                      , IKPFU_CODICE                                            
                      , IKPFU_ORDINALE                                          
                      , IKPFU_LIVELLO                                           
                      , IKPFU_PRG_PADRE                                         
                      , IKPFU_URL                                               
                      , IKPFU_CONTENITORE                                       
                      , IKPFU_FT                                                
                      , IKPFU_DESCRIZIONE                                       
                      , IKPFU_HELP                                              
GM124J                , IKPFU_ALIAS                                             
                   FROM IKPFUNZIONI                                             
                  WHERE IKPFU_FT     = :IKPFU-FT                                
                    AND IKPFU_STATO <> 'D'                                      
                    AND EXISTS                                                  
                       (SELECT 1 FROM IKPABILITAZIONI                           
                         WHERE IKPFU_BANCA IN (' ',IKPAB_BANCA)                 
                           AND IKPAB_REB    = :IKPAB-REB                        
                           AND IKPAB_UID    = :IKPAB-UID                        
GM148D*                    AND SUBSTR(CONCAT(IKPAB_ABIL,IKPAB_ABIL1),           
GM148D                     AND SUBSTR(IKPAB_ABIL �� IKPAB_ABIL1                 
GM148D                                           �� IKPAB_ABIL2,                
                                   INTEGER(IKPFU_PRG_CODICE),1) <> '0'          
NEYES                      AND IKPAB_PROG IN (1,2))                             
                   WITH UR                                                      
                    FOR FETCH ONLY                                              
           END-EXEC                                                             


sql snippet 19
           EXEC SQL OPEN CURVALI  END-EXEC                                      


sql snippet 20
           EXEC SQL                                                             
                DECLARE CURPROD CURSOR FOR                                      
                 SELECT IKPFU_SERVIZIO                                          
                      , IKPFU_PRG_CODICE                                        
                      , IKPFU_CODICE                                            
                      , IKPFU_ORDINALE                                          
                      , IKPFU_LIVELLO                                           
                      , IKPFU_PRG_PADRE                                         
                      , IKPFU_URL                                               
                      , IKPFU_CONTENITORE                                       
                      , IKPFU_FT                                                
                      , IKPFU_DESCRIZIONE                                       
GM124J                , IKPFU_ALIAS                                             
                   FROM IKPFUNZIONI                                             
                  WHERE IKPFU_FT     = :IKPFU-FT                                
                    AND IKPFU_STATO <> 'R'                                      
                    AND IKPFU_STATO <> 'N'                                      
                    AND IKPFU_STATO <> 'D'                                      
                    AND EXISTS                                                  
                       (SELECT 1 FROM IKPABILITAZIONI                           
                         WHERE IKPFU_BANCA IN (' ',IKPAB_BANCA)                 
                           AND IKPAB_REB    = :IKPAB-REB                        
                           AND IKPAB_UID    = :IKPAB-UID                        
GM148D*                    AND SUBSTR(CONCAT(IKPAB_ABIL,IKPAB_ABIL1),           
GM148D                     AND SUBSTR(IKPAB_ABIL �� IKPAB_ABIL1                 
GM148D                                           �� IKPAB_ABIL2,                
                                   INTEGER(IKPFU_PRG_CODICE),1) <> '0'          
NEYES                      AND IKPAB_PROG IN (1,2))                             
                   WITH UR                                                      
                    FOR FETCH ONLY                                              
           END-EXEC                                                             


sql snippet 21
           EXEC SQL OPEN CURPROD  END-EXEC                                      


sql snippet 22
           EXEC SQL                                                             
                FETCH CURKEYA                                                   
                 INTO :IKPFU-SERVIZIO                                           
                    , :IKPFU-PRG-CODICE                                         
                    , :IKPFU-CODICE                                             
                    , :IKPFU-ORDINALE                                           
                    , :IKPFU-LIVELLO                                            
                    , :IKPFU-PRG-PADRE                                          
                    , :IKPFU-URL                                                
                    , :IKPFU-CONTENITORE                                        
                    , :IKPFU-FT                                                 
                    , :IKPFU-DESCRIZIONE                                        
                    , :IKPFU-HELP                                               
GM124J              , :IKPFU-ALIAS                                              
           END-EXEC                                                             


sql snippet 23
           EXEC SQL                                                             
                FETCH CURVALI                                                   
                 INTO :IKPFU-SERVIZIO                                           
                    , :IKPFU-PRG-CODICE                                         
                    , :IKPFU-CODICE                                             
                    , :IKPFU-ORDINALE                                           
                    , :IKPFU-LIVELLO                                            
                    , :IKPFU-PRG-PADRE                                          
                    , :IKPFU-URL                                                
                    , :IKPFU-CONTENITORE                                        
                    , :IKPFU-FT                                                 
                    , :IKPFU-DESCRIZIONE                                        
                    , :IKPFU-HELP                                               
GM124J              , :IKPFU-ALIAS                                              
           END-EXEC                                                             


sql snippet 24
           EXEC SQL                                                             
                FETCH CURPROD                                                   
                 INTO :IKPFU-SERVIZIO                                           
                    , :IKPFU-PRG-CODICE                                         
                    , :IKPFU-CODICE                                             
                    , :IKPFU-ORDINALE                                           
                    , :IKPFU-LIVELLO                                            
                    , :IKPFU-PRG-PADRE                                          
                    , :IKPFU-URL                                                
                    , :IKPFU-CONTENITORE                                        
                    , :IKPFU-FT                                                 
                    , :IKPFU-DESCRIZIONE                                        
GM124J              , :IKPFU-ALIAS                                              
           END-EXEC                                                             


sql snippet 25
           EXEC SQL                                                             
                CLOSE CURKEYA                                                   
           END-EXEC                                                             


sql snippet 26
           EXEC SQL                                                             
                CLOSE CURVALI                                                   
           END-EXEC                                                             


sql snippet 27
           EXEC SQL                                                             
                CLOSE CURPROD                                                   
           END-EXEC                                                             


sql snippet 28
                 EXEC SQL                                                       
                      DECLARE WEB_IKPALBERO CURSOR WITH RETURN FOR              
                      SELECT SERVIZIO                                           
                           , IDPADRE                                            
                           , ID                                                 
                           , CODICE                                             
                           , ORDINALE                                           
                           , LIVELLO                                            
                           , VALUE(IKPDC_DESCRIZIONE,DESCRIZIONE)               
                             AS DESCRIZIONE                                     
                           , URL                                                
                           , CONTENITORE                                        
                           , UTILIZZATORE                                       
                           , CONTO                                              
                        FROM IKPALBERO_1                                        
                        LEFT OUTER                                              
                        JOIN IKPDESCRIZIONI                                     
                          ON IKPDC_BANCA      IN (' ',:IKPDC-BANCA)             
                         AND IKPDC_LINGUA           = :IKPDC-LINGUA             
                         AND CONCAT(IKPDC_FT,IKPDC_CODICE) = CODICE             
                         AND IKPDC_PRG_CODICE              = ID                 
                 END-EXEC                                                       


sql snippet 29
                 EXEC SQL                                                       
                      OPEN WEB_IKPALBERO                                        
                 END-EXEC                                                       


sql snippet 30
                 EXEC SQL                                                       
                      DECLARE WEB_IKPALBERO2 CURSOR WITH RETURN FOR             
                           SELECT                                               
                             ID            AS IDIKP                             
                           , A.FUNCTION_ID AS FUNCTION_ID                       
                           , A.GROUP_ID    AS GROUP_ID                          
                           , A.ORDER_TYPE  AS ORDERTYPE                         
                           , A.SIGN_TYPE   AS SIGNTYPE                          
                           , A.URL         AS URL                               
                           , B.ORDER_ID    AS ORDERID                           
                           , B.PARENT_ID   AS PARENTID                          
                           , B.TYPE        AS TYPE                              
                        FROM IKPALBERO_1                                        
                        LEFT OUTER                                              
                        JOIN IBC_MD_MPFUNCTION                                  
                          ON :FT = IBC_FT                                       
                          AND ID = IBC_PRG_CODICE                               
                          AND IBC_TIPO_OPE = 'F1'                               
                        LEFT OUTER JOIN DB2C.IBC_FUNCTIONS AS A                 
                        ON IBC_FUNCTION_ID = A.FUNCTION_ID                      
                        LEFT OUTER JOIN DB2C.IBC_PRODUCT_FUNCTIONS B            
                        ON B.FUNCTION_ID = IBC_FUNCTION_ID                      
                 END-EXEC                                                       


sql snippet 31
                 EXEC SQL                                                       
                      OPEN WEB_IKPALBERO2                                       
                 END-EXEC                                                       


