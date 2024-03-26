SHELL := /usr/bin/env bash

args = `arg="$(filter-out $(firstword $(MAKECMDGOALS)),$(MAKECMDGOALS))" && echo $${arg:-${1}}`

green  = $(shell printf "\e[32;01m$1\e[0m")
yellow = $(shell printf "\e[33;01m$1\e[0m")
red    = $(shell printf "\e[33;31m$1\e[0m")

format = $(shell printf "%-40s %s" "$(call green,$1)" $2)

comma:= ,

.DEFAULT_GOAL:=help

%:
	@:

help:
	@echo ""
	@echo "$(call yellow,Use the following CLI commands:)"
	@echo "$(call red,===============================)"
	@echo "$(call format,start,'Start Vite development server.')"
	@echo "$(call format,stop,'Stop containers.')"
	@echo "$(call format,start dev vite,'Start Dockerized Vite development server.')"
	@echo "$(call format,start dev vite --build,'Start and rebuild Dockerized Vite development server.')"
	@echo "$(call format,start dev nginx,'Start Nginx development server.')"
	@echo "$(call format,start dev nginx --build,'Start and rebuild Nginx development server.')"
	@echo "$(call format,start prod,'Start production server.')"
	@echo "$(call format,start prod --build,'Start and rebuild production server.')"
	@echo "$(call format,stop dev vite,'Stop Dockerized Vite development server.')"
	@echo "$(call format,stop dev nginx,'Stop Nginx development server.')"
	@echo "$(call format,stop prod,'Stop production server.')"
	@echo "$(call format,remove dev vite,'Stop and remove Vite development server containers.')"
	@echo "$(call format,remove dev nginx,'Stop and remove Nginx development server containers.')"
	@echo "$(call format,remove prod,'Stop and remove production server containers.')"
	@echo "$(call format,exportsrcbackup,'Build & export site as zip for import to production web server')"

start:
	@./bin/docker-compose start $(filter-out $@,$(MAKECMDGOALS))
stop:
	@./bin/docker-compose stop $(filter-out $@,$(MAKECMDGOALS))
remove:
	@./bin/docker-compose remove $(filter-out $@,$(MAKECMDGOALS))
exportsrcbackup:
	@./bin/export-src-backup $(filter-out $@,$(MAKECMDGOALS))	
.PHONY: start stop remove %

